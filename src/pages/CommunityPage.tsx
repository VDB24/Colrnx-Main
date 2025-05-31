import { useEffect, useState } from 'react';
import { Users, MessageSquare, BookOpen, Calendar, UserPlus, Award, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import { useSearchFilter } from '../hooks/useSearchFilter';

function CommunityPage() {
  const [studyGroups] = useState([
    {
      id: 1,
      title: 'JavaScript Bootcamp',
      description: 'Intensive 8-week program covering JavaScript fundamentals through advanced concepts.',
      leader: 'Sarah Chen',
      schedule: 'Tuesdays & Thursdays',
      members: 12,
      maxMembers: 20,
      status: 'open',
      tags: ['JavaScript', 'Web Development'],
      level: 'intermediate'
    },
    {
      id: 2,
      title: 'Java Development Group',
      description: 'Weekly sessions focusing on Java programming and problem-solving.',
      leader: 'Michael Obi',
      schedule: 'Every Saturday',
      members: 18,
      maxMembers: 20,
      status: 'almost-full',
      tags: ['Java', 'Backend'],
      level: 'advanced'
    },
    {
      id: 3,
      title: 'Python for Beginners',
      description: 'Learn Python basics with hands-on exercises and projects.',
      leader: 'Emma Wilson',
      schedule: 'Mondays & Wednesdays',
      members: 8,
      maxMembers: 15,
      status: 'open',
      tags: ['Python', 'Programming'],
      level: 'beginner'
    }
  ]);

  const filteredGroups = useSearchFilter(studyGroups, ['title', 'description', 'tags']);

  useEffect(() => {
    document.title = 'Community | LearnFlow';
  }, []);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Connect with other learners and join study groups
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                Community Members
              </p>
              <p className="text-2xl font-bold">50,000+</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
              <BookOpen className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                Study Groups
              </p>
              <p className="text-2xl font-bold">320+</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
              <MessageSquare className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                Active Discussions
              </p>
              <p className="text-2xl font-bold">1,200+</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                Active Mentors
              </p>
              <p className="text-2xl font-bold">150+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar placeholder="Search study groups..." />
        <FilterBar 
          options={{
            levels: ['beginner', 'intermediate', 'advanced'],
            categories: ['programming', 'web-development', 'data-science', 'mobile-dev'],
            sortOptions: ['newest', 'popular', 'availability']
          }}
        />
      </div>
      
      {/* Study Groups */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Study Groups</h2>
          <button className="btn-primary btn-sm">
            Create New Group
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map(group => (
            <div key={group.id} className="card hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{group.title}</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Led by {group.leader}
                    </p>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  group.status === 'open' 
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {group.status === 'open' ? 'Open' : 'Almost Full'}
                </span>
              </div>
              
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {group.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {group.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {group.schedule}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
              </div>
              
              <button className="btn-primary w-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 mr-2" /> Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Community CTA */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Own Study Group</h2>
          <p className="text-lg mb-6 opacity-90">
            Have a specific topic you'd like to study with others? Create your own study group and invite fellow learners.
          </p>
          <button className="btn bg-white text-primary-500 hover:bg-gray-100 transition-colors">
            Create Study Group
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CommunityPage;