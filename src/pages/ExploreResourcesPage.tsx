import { useEffect } from 'react';
import { Search, BookOpen, Star, Clock, Filter } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

function ExploreResourcesPage() {
  useEffect(() => {
    document.title = 'Explore Resources | LearnFlow';
  }, []);

  const resources = [
    {
      id: 1,
      title: 'Complete JavaScript Guide',
      type: 'Course',
      description: 'Master JavaScript from basics to advanced concepts',
      image: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
      duration: '20 hours',
      level: 'Intermediate',
      rating: 4.8,
      reviews: 1250
    },
    {
      id: 2,
      title: 'React Development Bootcamp',
      type: 'Bootcamp',
      description: 'Intensive React.js training with real-world projects',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      duration: '40 hours',
      level: 'Advanced',
      rating: 4.9,
      reviews: 980
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      type: 'Course',
      description: 'Learn HTML, CSS, and JavaScript basics',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
      duration: '15 hours',
      level: 'Beginner',
      rating: 4.7,
      reviews: 2100
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Resources</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Discover courses, tutorials, and learning materials
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex gap-4">
          <button className="btn-secondary flex items-center">
            <Filter className="w-5 h-5 mr-2" /> Filter
          </button>
          
          <select className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource.id} className="card hover:shadow-lg transition-all duration-300">
            <div className="relative mb-4">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <span className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                {resource.type}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
              {resource.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {resource.duration}
                </span>
              </div>
              <span className="text-sm font-medium px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-500 rounded-full">
                {resource.level}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="font-medium">{resource.rating}</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm ml-1">
                  ({resource.reviews} reviews)
                </span>
              </div>
            </div>
            
            <button className="btn-primary w-full">Start Learning</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default ExploreResourcesPage;