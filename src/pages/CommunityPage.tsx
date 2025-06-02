import { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronRight, Star, Plus, X, Edit, Eye, MessageSquare, Trash2 } from 'lucide-react';
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

  const handleDeleteGroup = async (groupId: string) => {
    if (!window.confirm('Are you sure you want to delete this study group? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete group members first (cascade will handle this, but being explicit)
      const { error: membersError } = await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId);

      if (membersError) throw membersError;

      // Delete group discussions
      const { error: discussionsError } = await supabase
        .from('study_group_discussions')
        .delete()
        .eq('group_id', groupId);

      if (discussionsError) throw discussionsError;

      // Delete the study group
      const { error: groupError } = await supabase
        .from('study_groups')
        .delete()
        .eq('id', groupId);

      if (groupError) throw groupError;

      // Refresh groups list
      await loadStudyGroups();
    } catch (error) {
      console.error('Error deleting study group:', error);
    }
  };

  // ... rest of the existing code ...

  return (
    <DashboardLayout>
      {/* ... existing JSX ... */}
      {/* Add delete button in group card actions */}
      {isGroupLeader(group.leader_id) && (
        <button 
          onClick={() => handleDeleteGroup(group.id)}
          className="text-red-500 hover:text-red-600 transition-colors ml-2"
          title="Delete Group"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
      {/* ... rest of the existing JSX ... */}
    </DashboardLayout>
  );
}

export default CommunityPage;