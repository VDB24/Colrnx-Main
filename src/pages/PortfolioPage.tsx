import { useEffect } from 'react';
import { Code, Award, FileEdit, Download, Share2, Plus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

function PortfolioPage() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Portfolio | LearnFlow';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Showcase your skills, projects, and achievements.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary btn-sm flex items-center">
                <FileEdit className="w-4 h-4 mr-2" /> Edit Portfolio
              </button>
              <button className="btn-secondary btn-sm flex items-center">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
              <button className="btn-secondary btn-sm flex items-center">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </button>
            </div>
          </div>
          
          {/* Portfolio Preview */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl overflow-hidden mb-12">
            {/* Header/About Section */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-primary-500">
                  {user?.user_metadata?.name?.charAt(0).toUpperCase()}
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold">{user?.user_metadata?.name}</h2>
                  <p className="text-xl opacity-90 mb-4">Full Stack Developer</p>
                  
                  <p className="max-w-xl opacity-90 mb-6">
                    Passionate developer focused on creating user-friendly web applications using modern technologies. Always eager to learn and take on new challenges.
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors rounded-full py-1 px-4 text-sm font-medium">
                      {user?.email}
                    </a>
                    <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors rounded-full py-1 px-4 text-sm font-medium">
                      github.com/username
                    </a>
                    <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors rounded-full py-1 px-4 text-sm font-medium">
                      linkedin.com/in/username
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">Skills</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Frontend Development</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>JavaScript/TypeScript</span>
                        <span>90%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>React & React Native</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>HTML/CSS</span>
                        <span>95%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Redux</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Backend Development</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Node.js</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Express</span>
                        <span>80%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>MongoDB</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>SQL</span>
                        <span>70%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                        <div className="bg-primary-500 h-full rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Projects Section */}
            <div className="border-t border-gray-200 dark:border-dark-border p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Projects</h3>
                <button className="btn-secondary btn-sm flex items-center">
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project 1 */}
                <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="E-commerce Project"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">E-commerce Platform</h4>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3">
                      A full-featured online store with product management, cart functionality, and payment processing.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                        React
                      </span>
                      <span className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                        Node.js
                      </span>
                      <span className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                        MongoDB
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <a href="#" className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors">
                        View Project
                      </a>
                      <a href="#" className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Project 2 */}
                <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Task Management App"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">Task Management App</h4>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-3">
                      A collaborative task manager with real-time updates, notifications, and team features.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                        React
                      </span>
                      <span className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                        Firebase
                      </span>
                      <span className="bg-gray-100 dark:bg-dark-border text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                        Tailwind CSS
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <a href="#" className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors">
                        View Project
                      </a>
                      <a href="#" className="text-primary-500 text-sm font-medium hover:text-primary-600 transition-colors">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certificates Section */}
            <div className="border-t border-gray-200 dark:border-dark-border p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Certificates</h3>
                <button className="btn-secondary btn-sm flex items-center">
                  <Plus className="w-4 h-4 mr-2" /> Add Certificate
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Certificate 1 */}
                <div className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">React Developer</h4>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                        LearnFlow
                      </p>
                    </div>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-2">
                    Advanced course covering React, Redux, and modern frontend practices.
                  </p>
                  <p className="text-sm">
                    Issued: <span className="font-medium">March 2025</span>
                  </p>
                </div>
                
                {/* Certificate 2 */}
                <div className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Full Stack JavaScript</h4>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                        LearnFlow
                      </p>
                    </div>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-2">
                    Comprehensive program covering both frontend and backend JavaScript development.
                  </p>
                  <p className="text-sm">
                    Issued: <span className="font-medium">January 2025</span>
                  </p>
                </div>
                
                {/* Certificate 3 */}
                <div className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">UI/UX Design Fundamentals</h4>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                        LearnFlow
                      </p>
                    </div>
                  </div>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-2">
                    Core concepts of user interface and experience design for digital products.
                  </p>
                  <p className="text-sm">
                    Issued: <span className="font-medium">November 2024</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Portfolio Tips */}
          <div className="bg-primary-50 dark:bg-primary-900/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Tips for a Great Portfolio</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  1
                </span>
                <span>Showcase your best projects with clear descriptions of your role and contributions.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  2
                </span>
                <span>Include relevant skills and quantify your proficiency levels.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </span>
                <span>Add certificates and credentials to validate your expertise.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  4
                </span>
                <span>Keep your portfolio updated with your latest work and accomplishments.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default PortfolioPage;