import { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronRight, Star, Plus, X, Edit, Eye, MessageSquare } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface StudyGroup {
  id: string;
  title: string;
  description: string;
  leader_id: string;
  schedule: string;
  max_members: number;
  level: string;
  category: string;
  tags: string[];
  status: string;
  created_at: string;
  leader_name?: string;
}

interface StudyGroupMember {
  group_id: string;
  user_id: string;
  role: string;
}

function CommunityPage() {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [yourCommunities, setYourCommunities] = useState<StudyGroup[]>([]);
  const [exploreCommunities, setExploreCommunities] = useState<StudyGroup[]>([]);
  const [members, setMembers] = useState<StudyGroupMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [groupForm, setGroupForm] = useState({
    title: '',
    description: '',
    schedule: '',
    max_members: 1,
    level: 'beginner',
    category: '',
    tags: [] as string[]
  });

  const filterOptions = {
    levels: ['beginner', 'intermediate', 'advanced'],
    categories: ['frontend', 'backend', 'fullstack', 'mobile', 'ai', 'data', 'devops', 'cloud', 'security']
  };

  const filteredGroups = useSearchFilter(exploreCommunities, ['title', 'description', 'tags']);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  useEffect(() => {
    document.title = 'Community | LearnFlow';
    loadStudyGroups();
    loadMembers();
  }, []);

  const loadStudyGroups = async () => {
    try {
      const { data: memberData } = await supabase
        .from('study_group_members')
        .select('group_id')
        .eq('user_id', user?.id);

      const memberGroupIds = memberData?.map(m => m.group_id) || [];

      const { data: groupsData, error: groupsError } = await supabase
        .from('study_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (groupsError) throw groupsError;

      const leaderIds = [...new Set(groupsData?.map(g => g.leader_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', leaderIds);

      const leaderMap = new Map(profilesData?.map(p => [p.id, p.name]) || []);

      const groupsWithLeaderNames = groupsData?.map(group => ({
        ...group,
        leader_name: leaderMap.get(group.leader_id) || 'Unknown'
      }));

      setYourCommunities(
        groupsWithLeaderNames?.filter(group => 
          group.leader_id === user?.id || memberGroupIds.includes(group.id)
        ) || []
      );

      setExploreCommunities(
        groupsWithLeaderNames?.filter(group => 
          group.leader_id !== user?.id && !memberGroupIds.includes(group.id)
        ) || []
      );

      setStudyGroups(groupsWithLeaderNames || []);
    } catch (error) {
      console.error('Error loading study groups:', error);
    }
  };

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('study_group_members')
        .select('*');

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      // Get group details first
      const { data: groupData } = await supabase
        .from('study_groups')
        .select('*, profiles:leader_id(name)')
        .eq('id', groupId)
        .single();

      // Join the group
      const { error } = await supabase
        .from('study_group_members')
        .insert([
          {
            group_id: groupId,
            user_id: user?.id,
            role: 'member'
          }
        ]);

      if (error) throw error;

      // Create notification for group leader
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-notification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: groupData.leader_id,
          title: 'New Community Member',
          content: `${user?.user_metadata?.name || 'A user'} has joined your community "${groupData.title}"`,
          type: 'info'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create notification');
      }

      await Promise.all([loadStudyGroups(), loadMembers()]);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Community</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              Create Community
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar />
            <FilterBar options={filterOptions} />
          </div>

          {/* Your Communities Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Your Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {yourCommunities.map((group) => (
                <div
                  key={group.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{group.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(group.level)}`}>
                      {group.level}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {group.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Users size={16} />
                      <span>{members.filter(m => m.group_id === group.id).length}/{group.max_members}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setIsDetailsModalOpen(true);
                      }}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Communities Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Explore Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{group.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(group.level)}`}>
                      {group.level}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {group.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Users size={16} />
                        <span>{members.filter(m => m.group_id === group.id).length}/{group.max_members}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{group.schedule}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CommunityPage;