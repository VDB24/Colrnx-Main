import { useEffect } from 'react';
import { BookOpen, Clock, Award, ArrowRight, Users, Brain, Code } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import { RainbowButton } from '../components/ui/rainbow-button';
import { TextShimmer } from '../components/ui/text-shimmer';

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | LearnFlow';
  }, []);

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 leading-tight">
          <TextShimmer
            as="span"
            duration={1.8}
            className="text-5xl font-semibold block [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.300)] dark:[--base-gradient-color:theme(colors.blue.100)]"
          >
            {`Welcome back, ${user?.user_metadata?.name || "Learner"}!`}
          </TextShimmer>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Continue your learning journey today.
        </p>
        <RainbowButton
          className="text-white dark:text-black transition-shadow duration-500 shadow-lg hover:shadow-2xl hover:scale-105"
          onClick={() => navigate('/learn/explore')}
        >
          Explore Resources
        </RainbowButton>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link 
          to="/projects"
          className="group bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3 border border-gray-100 dark:border-neutral-800"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-[#5164E1] dark:group-hover:text-[#A7D1F1] transition-colors">Create Project</span>
        </Link>

        <Link 
          to="/community"
          className="group bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3 border border-gray-100 dark:border-neutral-800"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Users className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-[#5164E1] dark:group-hover:text-[#A7D1F1] transition-colors">Explore Community</span>
        </Link>

        <Link 
          to="/learn/ai"
          className="group bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3 border border-gray-100 dark:border-neutral-800"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-[#5164E1] dark:group-hover:text-[#A7D1F1] transition-colors">Learn with AI</span>
        </Link>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#5164E1] dark:text-[#A7D1F1]">Learning Streak</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold">5 days</p>
          <p className="text-gray-400 dark:text-gray-500 mt-1">Keep it up!</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#5164E1] dark:text-[#A7D1F1]">Hours Learned</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold">12.5</p>
          <p className="text-gray-400 dark:text-gray-500 mt-1">This week</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#5164E1] dark:text-[#A7D1F1]">Courses</h3>
            <div className="w-12 h-12 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-gray-400 dark:text-gray-500 mt-1">In progress</p>
        </div>
      </div>
      
      {/* Continue Learning Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#5164E1] dark:text-[#A7D1F1]">Continue Learning</h2>
          <button className="text-[#5164E1] dark:text-[#A7D1F1] hover:underline flex items-center transition-colors">
            View all courses <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#5164E1] dark:text-[#A7D1F1]">JavaScript Fundamentals</h3>
                <p className="text-gray-400 dark:text-gray-500">
                  Module 3: Functions & Objects
                </p>
              </div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="text-[#5164E1] dark:text-[#A7D1F1]">40%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#5164E1] to-[#A7D1F1] h-full rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
            
            <RainbowButton className="w-full text-white dark:text-black transition-shadow duration-500 shadow-lg hover:shadow-2xl hover:scale-105">
              Continue Learning
            </RainbowButton>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#5164E1] dark:text-[#A7D1F1]">React Essentials</h3>
                <p className="text-gray-400 dark:text-gray-500">
                  Module 2: Components & Props
                </p>
              </div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="text-[#5164E1] dark:text-[#A7D1F1]">25%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#5164E1] to-[#A7D1F1] h-full rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
            
            <RainbowButton className="w-full text-white dark:text-black transition-shadow duration-500 shadow-lg hover:shadow-2xl hover:scale-105">
              Continue Learning
            </RainbowButton>
          </div>
        </div>
      </div>
      
      {/* Recent Achievements */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-[#5164E1] dark:text-[#A7D1F1]">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#5164E1] dark:text-[#A7D1F1]">5-Day Streak</h3>
            <p className="text-gray-400 dark:text-gray-500">
              You've been learning consistently for 5 days!
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#5164E1] dark:text-[#A7D1F1]">First Project</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Completed your first coding project
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-neutral-800">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#5164E1] dark:text-[#A7D1F1]">JavaScript Basics</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Completed JavaScript Fundamentals Module 1
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;