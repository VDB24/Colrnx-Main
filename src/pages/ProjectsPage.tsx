import { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronRight, Star, StarHalf, Code, Plus, X, Edit, Eye } from 'lucide-react';
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

  const filteredProjects = useSearchFilter(projects, ['title', 'description', 'tags']);

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
    document.title = 'Projects | LearnFlow';
    loadProjects();
    loadParticipants();
  }, []);

  const loadProjects = async () => {
    try {
      const { data: participantData } = await supabase
        .from('project_participants')
        .select('project_id')
        .eq('user_id', user?.id);

      const participatedProjectIds = participantData?.map(p => p.project_id) || [];

      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const creatorIds = [...new Set(projectsData?.map(p => p.created_by) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', creatorIds);

      const creatorMap = new Map(profilesData?.map(p => [p.id, p.name]) || []);

      const projectsWithCreatorNames = projectsData?.map(project => ({
        ...project,
        creator_name: creatorMap.get(project.created_by) || 'Unknown'
      }));

      setYourProjects(
        projectsWithCreatorNames?.filter(project => 
          project.created_by === user?.id || participatedProjectIds.includes(project.id)
        ) || []
      );

      setExploreProjects(
        projectsWithCreatorNames?.filter(project => 
          project.created_by !== user?.id && !participatedProjectIds.includes(project.id)
        ) || []
      );

      setProjects(projectsWithCreatorNames || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('project_participants')
        .select('*');

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error loading participants:', error);
    }
  };

  const handleProjectAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!projectForm.title || !projectForm.description || !projectForm.category) {
        throw new Error('Please fill in all required fields');
      }

      if (projectForm.description.length < 200) {
        throw new Error('Description must be at least 200 characters long');
      }

      if (isEditing && selectedProject) {
        const { error } = await supabase
          .from('projects')
          .update({
            ...projectForm,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedProject.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([
            {
              ...projectForm,
              created_by: user?.id
            }
          ])
          .select()
          .single();

        if (error) throw error;

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
      }

      setProjectForm({
        title: '',
        description: '',
        difficulty: 'beginner',
        estimated_hours: 1,
        max_participants: 1,
        tags: [],
        category: ''
      });
      setIsModalOpen(false);
      setIsDetailsModalOpen(false);
      setSelectedProject(null);
      setIsEditing(false);

      await Promise.all([loadProjects(), loadParticipants()]);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
    setIsEditing(false);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      difficulty: project.difficulty,
      estimated_hours: project.estimated_hours,
      max_participants: project.max_participants,
      tags: project.tags,
      category: project.category
    });
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleJoinProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('project_participants')
        .insert([
          {
            project_id: projectId,
            user_id: user?.id,
            role: 'member'
          }
        ]);

      if (error) throw error;
      await loadParticipants();
    } catch (error) {
      console.error('Error joining project:', error);
    }
  };

  const isProjectCreator = (projectCreatorId: string) => {
    return user?.id === projectCreatorId;
  };

  const isProjectParticipant = (projectId: string) => {
    return participants.some(p => p.project_id === projectId && p.user_id === user?.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !projectForm.tags.includes(newTag)) {
        setProjectForm({
          ...projectForm,
          tags: [...projectForm.tags, newTag]
        });
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProjectForm({
      ...projectForm,
      tags: projectForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Build your portfolio with real-world projects and collaborate with other learners.
            </p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditing(false);
              setProjectForm({
                title: '',
                description: '',
                difficulty: 'beginner',
                estimated_hours: 1,
                max_participants: 1,
                tags: [],
                category: ''
              });
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yourProjects.map(project => (
            <div key={project.id} className="card hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div className={`inline-block ${getDifficultyColor(project.difficulty)} rounded-full px-3 py-1 text-xs font-medium`}>
                    {project.difficulty}
                  </div>
                  {isProjectCreator(project.created_by) && (
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <h3 className="text-xl font-semibold mt-3">{project.title}</h3>
              </div>
              
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

              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                <p>Created by {project.creator_name}</p>
                <p>on {formatDate(project.created_at)}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewDetails(project)}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
          {yourProjects.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                You haven't created or joined any projects yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <h2 className="text-2xl font-bold">Explore Projects</h2>
          <SearchBar placeholder="Search projects..." />
          <FilterBar 
            options={{
              levels: ['beginner', 'intermediate', 'advanced'],
              categories: ['frontend', 'backend', 'fullstack', 'mobile'],
              sortOptions: ['newest', 'popular']
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="card hover:shadow-lg transition-all duration-300">
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div className={`inline-block ${getDifficultyColor(project.difficulty)} rounded-full px-3 py-1 text-xs font-medium`}>
                    {project.difficulty}
                  </div>
                  {isProjectCreator(project.created_by) && (
                    <button 
                      onClick={() => handleEditProject(project)}
                      className="text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <h3 className="text-xl font-semibold mt-3">{project.title}</h3>
              </div>
              
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

              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                <p>Created by {project.creator_name}</p>
                <p>on {formatDate(project.created_at)}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewDetails(project)}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                
                {!isProjectCreator(project.created_by) && !isProjectParticipant(project.id) && (
                  <button 
                    onClick={() => handleJoinProject(project.id)}
                    className="btn-primary flex-1"
                  >
                    Join Project
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDetailsModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h2 className="text-2xl font-bold">Project Details</h2>
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setSelectedProject(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`inline-block ${getDifficultyColor(selectedProject.difficulty)} rounded-full px-3 py-1 text-xs font-medium mb-2`}>
                    {selectedProject.difficulty}
                  </div>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                </div>
                {isProjectCreator(selectedProject.created_by) && (
                  <button 
                    onClick={() => {
                      handleEditProject(selectedProject);
                      setIsDetailsModalOpen(false);
                    }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Project
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap break-words">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Project Details</h4>
                    <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Estimated: {selectedProject.estimated_hours} hours
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Team Size: {selectedProject.max_participants} members
                      </li>
                      <li>Category: {selectedProject.category}</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Creator Information</h4>
                    <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                      <li>Created by: {selectedProject.creator_name}</li>
                      <li>Created on: {formatDate(selectedProject.created_at)}</li>
                    </ul>
                  </div>
                </div>

                {!isProjectCreator(selectedProject.created_by) && !isProjectParticipant(selectedProject.id) && (
                  <div className="mt-8">
                    <button 
                      onClick={() => {
                        handleJoinProject(selectedProject.id);
                        setIsDetailsModalOpen(false);
                      }}
                      className="btn-primary w-full"
                    >
                      Join Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Project' : 'Create New Project'}</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setSelectedProject(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleProjectAction} className="p-6">
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
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description * (minimum 200 characters)
                  </label>
                  <textarea
                    id="description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    required
                    minLength={200}
                    placeholder="Provide a detailed description of your project (minimum 200 characters)"
                  ></textarea>
                  <p className="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {projectForm.description.length}/200 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
                      Difficulty Level *
                    </label>
                    <select
                      id="difficulty"
                      value={projectForm.difficulty}
                      onChange={(e) => setProjectForm({...projectForm, difficulty: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                      Category *
                    </label>
                    <select
                      id="category"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
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
                      Estimated Hours *
                    </label>
                    <input
                      type="number"
                      id="estimated_hours"
                      value={projectForm.estimated_hours}
                      onChange={(e) => setProjectForm({...projectForm, estimated_hours: parseInt(e.target.value)})}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="max_participants" className="block text-sm font-medium mb-1">
                      Max Participants *
                    </label>
                    <input
                      type="number"
                      id="max_participants"
                      value={projectForm.max_participants}
                      onChange={(e) => setProjectForm({...projectForm, max_participants: parseInt(e.target.value)})}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
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
                    {projectForm.tags.map(tag => (
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setSelectedProject(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}
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