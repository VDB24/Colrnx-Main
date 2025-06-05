import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Clock, Users, Calendar, FileText, MessageSquare, 
  Link as LinkIcon, Plus, Edit, Check, X, ExternalLink
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimated_hours: number;
  max_participants: number;
  category: string;
  created_by: string;
  created_at: string;
  status: string;
  start_date: string | null;
  target_completion_date: string | null;
  creator_name?: string;
}

interface Timeline {
  id: string;
  phase: 'planning' | 'development' | 'testing' | 'launch';
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  start_date: string | null;
  end_date: string | null;
}

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: 'document' | 'link' | 'forum';
  url: string | null;
  created_by: string;
  created_at: string;
}

interface Participant {
  user_id: string;
  role: string;
  joined_at: string;
  profiles: {
    name: string;
  };
}

function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [activePhase, setActivePhase] = useState<string>('planning');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<Timeline | null>(null);

  useEffect(() => {
    loadProjectDetails();
    loadParticipants();
    loadTimelines();
    loadResources();
  }, [id]);

  const loadProjectDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:created_by (
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      setProject({
        ...data,
        creator_name: data.profiles.name
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading project details:', error);
      toast.error('Failed to load project details');
      setIsLoading(false);
    }
  };

  const loadParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('project_participants')
        .select(`
          user_id,
          role,
          joined_at,
          profiles:user_id (
            name
          )
        `)
        .eq('project_id', id);

      if (error) throw error;
      setParticipants(data);
    } catch (error) {
      console.error('Error loading participants:', error);
      toast.error('Failed to load participants');
    }
  };

  const loadTimelines = async () => {
    try {
      const { data, error } = await supabase
        .from('project_timelines')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTimelines(data);
    } catch (error) {
      console.error('Error loading timelines:', error);
      toast.error('Failed to load timelines');
    }
  };

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('project_resources')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast.error('Failed to load resources');
    }
  };

  const handleTimelineUpdate = async (timeline: Timeline) => {
    try {
      const { error } = await supabase
        .from('project_timelines')
        .upsert({
          ...timeline,
          project_id: id
        });

      if (error) throw error;

      toast.success('Timeline updated successfully');
      loadTimelines();
      setEditingTimeline(null);
    } catch (error) {
      console.error('Error updating timeline:', error);
      toast.error('Failed to update timeline');
    }
  };

  const handleResourceAdd = async (resource: Partial<Resource>) => {
    try {
      const { error } = await supabase
        .from('project_resources')
        .insert([{
          ...resource,
          project_id: id,
          created_by: user?.id
        }]);

      if (error) throw error;

      toast.success('Resource added successfully');
      loadResources();
    } catch (error) {
      console.error('Error adding resource:', error);
      toast.error('Failed to add resource');
    }
  };

  const isProjectCreator = () => {
    return project?.created_by === user?.id;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading || !project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link
          to="/projects"
          className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center gap-4 text-light-text-secondary dark:text-dark-text-secondary">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {participants.length} Contributors
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Created {formatDate(project.created_at)}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {project.estimated_hours} hours
                </span>
              </div>
            </div>
            
            {isProjectCreator() && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Project
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-3">
              <h2 className="text-xl font-semibold mb-3">About This Project</h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-dark-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Project Status</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Current Phase
                    </span>
                    <p className="font-medium capitalize">{project.status}</p>
                  </div>
                  {project.start_date && (
                    <div>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Started
                      </span>
                      <p className="font-medium">{formatDate(project.start_date)}</p>
                    </div>
                  )}
                  {project.target_completion_date && (
                    <div>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Target Completion
                      </span>
                      <p className="font-medium">{formatDate(project.target_completion_date)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              project.difficulty === 'beginner'
                ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : project.difficulty === 'intermediate'
                ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {project.difficulty}
            </span>
            <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
            {project.tags?.map(tag => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Timeline */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Project Timeline</h2>
                {isProjectCreator() && (
                  <button
                    onClick={() => setEditingTimeline({ phase: activePhase } as Timeline)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Update
                  </button>
                )}
              </div>

              <div className="flex border-b border-gray-200 dark:border-dark-border mb-6">
                {['planning', 'development', 'testing', 'launch'].map(phase => (
                  <button
                    key={phase}
                    onClick={() => setActivePhase(phase)}
                    className={`px-4 py-2 font-medium capitalize transition-colors relative ${
                      activePhase === phase
                        ? 'text-primary-500'
                        : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500'
                    }`}
                  >
                    {phase}
                    {activePhase === phase && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {timelines
                  .filter(t => t.phase === activePhase)
                  .map(timeline => (
                    <div
                      key={timeline.id}
                      className="border-l-2 border-primary-500 pl-4 relative"
                    >
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary-500"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="whitespace-pre-wrap">{timeline.content}</p>
                          {timeline.start_date && (
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                              {formatDate(timeline.start_date)}
                              {timeline.end_date && ` - ${formatDate(timeline.end_date)}`}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          timeline.status === 'completed'
                            ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : timeline.status === 'in_progress'
                            ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            : 'bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                        }`}>
                          {timeline.status}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resources */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Resources</h2>
                {isProjectCreator() && (
                  <button
                    onClick={() => {/* Add resource modal */}}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Resource
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {resources.map(resource => (
                  <div
                    key={resource.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
                  >
                    {resource.type === 'document' ? (
                      <FileText className="w-5 h-5 text-primary-500" />
                    ) : resource.type === 'forum' ? (
                      <MessageSquare className="w-5 h-5 text-primary-500" />
                    ) : (
                      <LinkIcon className="w-5 h-5 text-primary-500" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{resource.title}</h3>
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {resources.length === 0 && (
                  <p className="text-center text-light-text-secondary dark:text-dark-text-secondary py-4">
                    No resources added yet
                  </p>
                )}
              </div>
            </div>

            {/* Contributors */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Contributors</h2>
              <div className="space-y-4">
                {participants.map(participant => (
                  <div
                    key={participant.user_id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{participant.profiles.name}</p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {participant.role === 'creator' ? 'Project Creator' : 'Contributor'}
                      </p>
                    </div>
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Joined {formatDate(participant.joined_at)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProjectDetailsPage;