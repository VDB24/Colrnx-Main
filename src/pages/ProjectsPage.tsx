import { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronRight, Star, StarHalf, Code, Plus, X, Edit, Eye, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
  estimated_hours: number;
  max_participants: number;
  category: string;
  created_by: string;
  created_at: string;
  creator_name?: string;
}

interface ProjectParticipant {
  project_id: string;
  user_id: string;
  role: string;
}

function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [yourProjects, setYourProjects] = useState<Project[]>([]);
  const [exploreProjects, setExploreProjects] = useState<Project[]>([]);
  const [participants, setParticipants] = useState<ProjectParticipant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    estimated_hours: 1,
    max_participants: 1,
    tags: [] as string[],
    category: ''
  });

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isProjectCreator = (createdBy: string): boolean => {
    return user?.id === createdBy;
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete project participants first (cascade will handle this, but being explicit)
      const { error: participantsError } = await supabase
        .from('project_participants')
        .delete()
        .eq('project_id', projectId);

      if (participantsError) throw participantsError;

      // Delete the project
      const { error: projectError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (projectError) throw projectError;

      // Refresh projects list
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // ... rest of the existing code remains exactly the same ...

  // Update the project card JSX to include the delete button
  return (
    <DashboardLayout>
      {/* ... existing JSX ... */}
      <div className="flex justify-between items-start">
        <div className={`inline-block ${getDifficultyColor(project.difficulty)} rounded-full px-3 py-1 text-xs font-medium`}>
          {project.difficulty}
        </div>
        {isProjectCreator(project.created_by) && (
          <div className="flex items-center">
            <button 
              onClick={() => handleEditProject(project)}
              className="text-gray-500 hover:text-primary-500 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleDeleteProject(project.id)}
              className="text-red-500 hover:text-red-600 transition-colors ml-2"
              title="Delete Project"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {/* ... rest of the existing JSX ... */}
    </DashboardLayout>
  );
}

export default ProjectsPage;