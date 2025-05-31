import { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users, ChevronRight, Star, StarHalf, Code } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import { useSearchFilter } from '../hooks/useSearchFilter';

function ProjectsPage() {
  const [projects] = useState([
    {
      id: 1,
      title: 'E-commerce Product Page',
      description: 'Build a responsive product page with filtering, sorting, and cart functionality.',
      tags: ['React', 'Tailwind CSS', 'API Integration'],
      level: 'intermediate',
      duration: '20-25 hours',
      rating: 4.5,
      reviews: 128,
      category: 'frontend'
    },
    {
      id: 2,
      title: 'Java Spring Boot API',
      description: 'Create a RESTful API using Java Spring Boot and PostgreSQL.',
      tags: ['Java', 'Spring Boot', 'PostgreSQL'],
      level: 'advanced',
      duration: '30-35 hours',
      rating: 4.8,
      reviews: 95,
      category: 'backend'
    },
    // Add more projects...
  ]);

  const filteredProjects = useSearchFilter(projects, ['title', 'description', 'tags']);

  useEffect(() => {
    document.title = 'Projects | LearnFlow';
  }, []);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Build your portfolio with real-world projects and collaborate with other learners.
        </p>
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
                {project.level}
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
                  {project.duration}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(Math.floor(project.rating))].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  {project.rating % 1 !== 0 && (
                    <StarHalf className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
                <span className="ml-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  ({project.reviews})
                </span>
              </div>
            </div>
            
            <button className="btn-primary w-full">
              View Details
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default ProjectsPage;