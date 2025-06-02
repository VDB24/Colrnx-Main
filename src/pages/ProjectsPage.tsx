import { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronRight, Star, StarHalf, Code, Plus, X } from 'lucide-react';
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
  level: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  max_participants?: number;
  difficulty: string;
  estimated_hours?: number;
  created_by: string;
}

function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    estimated_hours: 0,
    max_participants: 1,
    tags: [] as string[],
    category: ''
  });

  const filteredProjects = useSearchFilter(projects, ['title', 'description', 'tags']);

  useEffect(() => {
    document.title = 'Projects | LearnFlow';
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate form
      if (!newProject.title || !newProject.description) {
        throw new Error('Please fill in all required fields');
      }

      // Create project in Supabase
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...newProject,
            created_by: user?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Add creator as first participant
      const { error: participantError } = await supabase
        .from('project_participants')
        .insert([
          {
            project_id: data.id,
            user_id: user?.id,
            role: 'creator'
          }
        ]);

      if (participantError) throw participantError;

      // Reset form and close modal
      setNewProject({
        title: '',
        description: '',
        difficulty: 'beginner',
        estimated_hours: 0,
        max_participants: 1,
        tags: [],
        category: ''
      });
      setIsModalOpen(false);

      // Reload projects
      loadProjects();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !newProject.tags.includes(newTag)) {
        setNewProject({
          ...newProject,
          tags: [...newProject.tags, newTag]
        });
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Build your portfolio with real-world projects and collaborate with other learners.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar placeholder="Search projects..." />
        <FilterBar 
          options={{
            levels: ['beginner', 'intermediate', 'advanced'],
            categories: ['frontend', 'backend', 'fullstack', 'mobile'],
            sortOptions: ['rating', 'newest', 'popular']
          }}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="card hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <div className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full px-3 py-1 text-xs font-medium mb-2">
                {project.difficulty}
              </div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
            
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {project.estimated_hours} hours
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {project.max_participants} max
                </span>
              </div>
            </div>
            
            <button className="btn-primary w-full">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h2 className="text-2xl font-bold">Create New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      value={newProject.difficulty}
                      onChange={(e) => setNewProject({...newProject, difficulty: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select category</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="fullstack">Full Stack</option>
                      <option value="mobile">Mobile</option>
                      <option value="ai">AI/ML</option>
                      <option value="data">Data Science</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="estimated_hours" className="block text-sm font-medium mb-1">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      id="estimated_hours"
                      value={newProject.estimated_hours}
                      onChange={(e) => setNewProject({...newProject, estimated_hours: parseInt(e.target.value)})}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="max_participants" className="block text-sm font-medium mb-1">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      id="max_participants"
                      value={newProject.max_participants}
                      onChange={(e) => setNewProject({...newProject, max_participants: parseInt(e.target.value)})}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium mb-1">
                    Tags (Press Enter to add)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    onKeyDown={handleTagInput}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., React, TypeScript"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-primary-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ProjectsPage;