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
  // Add the getDifficultyColor function
  const getDifficultyColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('study_groups')
        .delete()
        .eq('id', groupId);

      if (error) throw error;

      // Refresh groups after deletion
      await loadStudyGroups();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  // ... (previous functions remain the same until the return statement)

  return (
    <DashboardLayout>
      {/* ... (previous JSX remains the same until the group cards) */}
      
      {/* Update Your Communities and Explore Communities sections to include delete button */}
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div className={`inline-block ${getDifficultyColor(group.level)} rounded-full px-3 py-1 text-xs font-medium`}>
            {group.level}
          </div>
          {isGroupLeader(group.leader_id) && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleEditGroup(group)}
                className="text-gray-500 hover:text-primary-500 transition-colors"
                title="Edit group"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDeleteGroup(group.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Delete group"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        {/* ... (rest of the group card remains the same) */}
      </div>

      {/* Update Details Modal to include delete button */}
      {isDetailsModalOpen && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Group Details</h2>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedGroup(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`inline-block ${getDifficultyColor(selectedGroup.level)} rounded-full px-3 py-1 text-xs font-medium mb-2`}>
                    {selectedGroup.level}
                  </div>
                  <h3 className="text-2xl font-bold">{selectedGroup.title}</h3>
                </div>
                {isGroupLeader(selectedGroup.leader_id) && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        handleEditGroup(selectedGroup);
                        setIsDetailsModalOpen(false);
                      }}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Group
                    </button>
                    <button 
                      onClick={() => {
                        handleDeleteGroup(selectedGroup.id);
                        setIsDetailsModalOpen(false);
                      }}
                      className="btn-secondary text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Group
                    </button>
                  </div>
                )}
              </div>
              {/* ... (rest of the details modal remains the same) */}
            </div>
          </div>
        </div>
      )}
      
      {/* ... (rest of the component remains the same) */}
    </DashboardLayout>
  );
}

export default CommunityPage;