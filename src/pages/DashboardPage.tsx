import { useEffect } from 'react';
import { BookOpen, Clock, Award, ArrowRight } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.user_metadata?.name}!</h1>
            <p className="opacity-90 text-lg">Ready to continue your learning journey?</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="mr-6">
              <p className="text-sm opacity-90">Learning streak</p>
              <p className="text-2xl font-bold">5 days</p>
            </div>
            <div>
              <p className="text-sm opacity-90">XP earned</p>
              <p className="text-2xl font-bold">1,240</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Learning Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <button className="text-primary-500 hover:text-primary-600 transition-colors flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Card 1 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="relative mb-4">
              <img
                src="https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="JavaScript Fundamentals"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3 bg-white dark:bg-dark-card px-2 py-1 rounded-md text-xs font-medium">
                40% Complete
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">JavaScript Fundamentals</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>14 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>3 hours left</span>
            </div>
            
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
            
            <button className="btn-primary w-full">Continue Learning</button>
          </div>
          
          {/* Course Card 2 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="relative mb-4">
              <img
                src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="React Hooks Mastery"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3 bg-white dark:bg-dark-card px-2 py-1 rounded-md text-xs font-medium">
                25% Complete
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">React Hooks Mastery</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>8 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>5 hours left</span>
            </div>
            
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
            
            <button className="btn-primary w-full">Continue Learning</button>
          </div>
          
          {/* Course Card 3 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="relative mb-4">
              <img
                src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Data Structures & Algorithms"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3 bg-white dark:bg-dark-card px-2 py-1 rounded-md text-xs font-medium">
                60% Complete
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Data Structures & Algorithms</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>20 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>8 hours left</span>
            </div>
            
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            
            <button className="btn-primary w-full">Continue Learning</button>
          </div>
        </div>
      </div>
      
      {/* Recommended Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <button className="text-primary-500 hover:text-primary-600 transition-colors flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Recommended Course 1 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="TypeScript Essentials"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">TypeScript Essentials</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>12 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>6 hours</span>
            </div>
            
            <button className="btn-secondary w-full">Start Learning</button>
          </div>
          
          {/* Recommended Course 2 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Responsive Web Design"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Responsive Web Design</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>10 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>5 hours</span>
            </div>
            
            <button className="btn-secondary w-full">Start Learning</button>
          </div>
          
          {/* Recommended Course 3 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Node.js Backend Development"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Node.js Backend Development</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>16 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>8 hours</span>
            </div>
            
            <button className="btn-secondary w-full">Start Learning</button>
          </div>
          
          {/* Recommended Course 4 */}
          <div className="card hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Cloud Computing Fundamentals"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Cloud Computing Fundamentals</h3>
            <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>14 lessons</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>7 hours</span>
            </div>
            
            <button className="btn-secondary w-full">Start Learning</button>
          </div>
        </div>
      </div>
      
      {/* Recent Achievements */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Achievements</h2>
          <button className="text-primary-500 hover:text-primary-600 transition-colors flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Achievement 1 */}
          <div className="card flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">5-Day Streak</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                You've been learning for 5 consecutive days!
              </p>
            </div>
          </div>
          
          {/* Achievement 2 */}
          <div className="card flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">JavaScript Basics</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                Completed JavaScript Fundamentals Module 1
              </p>
            </div>
          </div>
          
          {/* Achievement 3 */}
          <div className="card flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary-500" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">First Project</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                Completed your first coding project
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;