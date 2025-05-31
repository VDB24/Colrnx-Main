import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Brain, Code, Award, Users, ChevronRight, Play, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "LearnFlow | AI-Powered Learning Platform";
  }, []);

  // Function to handle feature link clicks for unauthenticated users
  const handleFeatureClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      // Redirect to sign-up
      window.location.href = '/signup';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full px-4 py-1 text-sm font-medium mb-6">
                AI-Powered Learning
              </div>
              <h1 className="mb-6">
                Learn. Build. Grow <span className="text-gradient">Together.</span>
              </h1>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-xl">
                Join 50,000+ learners mastering tech skills through AI-powered education and real-world collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/learn\" className="btn-primary">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/signup" className="btn-primary">
                    Start Learning Free
                  </Link>
                )}
                <button className="btn-secondary">
                  <Play className="w-5 h-5 mr-2" /> Watch Demo
                </button>
              </div>
              
              <div className="mt-10 flex items-center">
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Trusted by learners from
                </p>
                <div className="ml-4 flex space-x-4">
                  <span className="text-base font-semibold">Google</span>
                  <span className="text-base font-semibold">Meta</span>
                  <span className="text-base font-semibold">Netflix</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-400/10 rounded-full filter blur-3xl"></div>
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Diverse learners collaborating" 
                className="rounded-xl shadow-xl relative z-10 w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Highlights Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-bg">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Supercharge Your Learning Journey</h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
              Our platform combines AI-powered learning with real-world projects and community support to help you achieve your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI Learning Assistant */}
            <div className="card feature-card transition-all duration-300">
              <div className="bg-primary-50 dark:bg-primary-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal AI Tutor</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Get instant answers, personalized learning paths, and adaptive explanations that match your pace.
              </p>
              <Link 
                to={isAuthenticated ? "/learn" : "/signup"} 
                onClick={handleFeatureClick}
                className="flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
              >
                Try AI Assistant <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {/* Hands-On Projects */}
            <div className="card feature-card transition-all duration-300">
              <div className="bg-primary-50 dark:bg-primary-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-World Projects</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Build portfolio-worthy projects with guided mentorship and collaborative teams.
              </p>
              <Link 
                to={isAuthenticated ? "/projects" : "/signup"} 
                onClick={handleFeatureClick}
                className="flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
              >
                Browse Projects <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {/* Skills Certification */}
            <div className="card feature-card transition-all duration-300">
              <div className="bg-primary-50 dark:bg-primary-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry Certificates</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Earn recognized certificates and build a portfolio that showcases your expertise.
              </p>
              <Link 
                to={isAuthenticated ? "/portfolio" : "/signup"} 
                onClick={handleFeatureClick}
                className="flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
              >
                View Certificates <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {/* Learning Community */}
            <div className="card feature-card transition-all duration-300">
              <div className="bg-primary-50 dark:bg-primary-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Community</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Connect with mentors, join study groups, and get feedback from industry professionals.
              </p>
              <Link 
                to={isAuthenticated ? "/community" : "/signup"} 
                onClick={handleFeatureClick}
                className="flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
              >
                Join Community <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Loved by Learners Worldwide</h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
              Join thousands of students who have transformed their careers with LearnFlow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Success Statistics */}
            <div className="card text-center">
              <h3 className="text-4xl font-bold text-primary-500 mb-2">50K+</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Active Students</p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-4xl font-bold text-primary-500 mb-2">95%</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Completion Rate</p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-4xl font-bold text-primary-500 mb-2">40%</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Average Salary Increase</p>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Alex Johnson</h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Frontend Developer at Google</p>
                </div>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                "LearnFlow's AI tutor helped me understand complex React concepts that I struggled with for months. The project-based approach prepared me for real-world challenges."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Data Scientist at Netflix</p>
                </div>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                "The data science track was comprehensive and the community support was incredible. I landed my dream job within 3 months of completing the course."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Testimonial author" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael Obi</h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Full Stack Developer at Meta</p>
                </div>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                "I switched careers from finance to tech using LearnFlow. The structured learning paths and hands-on projects gave me confidence to make the transition."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Learning Path Preview */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-bg">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Choose Your Learning Journey</h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
              Select from our popular career tracks designed by industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Full Stack Developer */}
            <div className="card border-2 border-primary-100 dark:border-primary-900 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
              <div className="mb-6">
                <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full px-3 py-1 text-xs font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Full Stack Developer</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Master frontend, backend, and DevOps skills to build complete web applications.
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="text-primary-500">Locked</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              
              <Link 
                to="/signup"
                className="btn-primary w-full"
              >
                Start Path
              </Link>
            </div>
            
            {/* Data Scientist */}
            <div className="card border-2 border-primary-100 dark:border-primary-900 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
              <div className="mb-6">
                <span className="inline-block bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full px-3 py-1 text-xs font-medium">
                  High Demand
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Scientist</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Learn Python, statistics, machine learning, and data visualization.
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="text-primary-500">Locked</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              
              <Link 
                to="/signup"
                className="btn-primary w-full"
              >
                Start Path
              </Link>
            </div>
            
            {/* UI/UX Designer */}
            <div className="card border-2 border-primary-100 dark:border-primary-900 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
              <div className="mb-6">
                <span className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full px-3 py-1 text-xs font-medium">
                  Creative
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">UI/UX Designer</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Design beautiful interfaces and seamless user experiences for web and mobile.
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="text-primary-500">Locked</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              
              <Link 
                to="/signup"
                className="btn-primary w-full"
              >
                Start Path
              </Link>
            </div>
            
            {/* AI Engineer */}
            <div className="card border-2 border-primary-100 dark:border-primary-900 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
              <div className="mb-6">
                <span className="inline-block bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full px-3 py-1 text-xs font-medium">
                  Advanced
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Engineer</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                Develop AI models, natural language processing systems, and computer vision applications.
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="text-primary-500">Locked</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              
              <Link 
                to="/signup"
                className="btn-primary w-full"
              >
                Start Path
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="mb-4">Choose Your Plan</h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
              Flexible options to suit your learning needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="card border-2 border-gray-200 dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Basic access to get started
                </p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Access to basic courses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Community forum access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Limited AI assistant</span>
                </li>
              </ul>
              
              <Link to="/signup" className="btn-secondary w-full">
                Start Free
              </Link>
            </div>
            
            {/* Pro Tier */}
            <div className="card border-2 border-primary-500 shadow-lg shadow-primary-100 dark:shadow-primary-900/20 relative">
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Everything you need to succeed
                </p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>All Free features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Full course library</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Unlimited AI assistant</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Project-based learning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
              
              <Link to="/signup" className="btn-primary w-full">
                Choose Pro
              </Link>
            </div>
            
            {/* Team Tier */}
            <div className="card border-2 border-gray-200 dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Team</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  For organizations and teams
                </p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>All Pro features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Admin dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Custom learning paths</span>
                </li>
              </ul>
              
              <Link to="/signup" className="btn-secondary w-full">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join thousands of learners and start building your skills today
            </p>
            <Link to={isAuthenticated ? "/learn" : "/signup"} className="btn bg-white text-primary-500 hover:bg-gray-100 transition-colors">
              {isAuthenticated ? "Go to Dashboard" : "Get Started For Free"}
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default HomePage;