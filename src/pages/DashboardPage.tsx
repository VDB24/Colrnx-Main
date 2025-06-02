import { useEffect } from 'react';
import { BookOpen, Clock, Award, ArrowRight, Users, Brain, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';

function DashboardPage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard | LearnFlow';
  }, []);

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-2xl p-10 mb-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.user_metadata?.name}!</h1>
          <p className="text-xl opacity-90">Continue your learning journey today</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link 
          to="/projects"
          className="group bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3"
        >
          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Code className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary-500 transition-colors">Create Project</span>
        </Link>

        <Link 
          to="/community"
          className="group bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3"
        >
          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Users className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary-500 transition-colors">Explore Community</span>
        </Link>

        <Link 
          to="/learn/ai"
          className="group bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3"
        >
          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary-500 transition-colors">Learn with AI</span>
        </Link>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Learning Streak</h3>
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold">5 days</p>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Keep it up!</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Hours Learned</h3>
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold">12.5</p>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">This week</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Courses</h3>
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">In progress</p>
        </div>
      </div>
      
      {/* Continue Learning Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <button className="text-primary-500 hover:text-primary-600 transition-colors flex items-center">
            View all courses <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">JavaScript Fundamentals</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Module 3: Functions & Objects
                </p>
              </div>
              <div className="w-16 h-16 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-500" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="text-primary-500">40%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
            
            <button className="btn-primary w-full">Continue Learning</button>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">React Essentials</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Module 2: Components & Props
                </p>
              </div>
              <div className="w-16 h-16 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-500" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="text-primary-500">25%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
            
            <button className="btn-primary w-full">Continue Learning</button>
          </div>
        </div>
      </div>
      
      {/* Recent Achievements */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">5-Day Streak</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              You've been learning consistently for 5 days!
            </p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">First Project</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Completed your first coding project
            </p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">JavaScript Basics</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Completed JavaScript Fundamentals Module 1
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;