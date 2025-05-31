import { useEffect, useState } from 'react';
import { User, Mail, Lock, BellRing, Settings, CreditCard, HelpCircle, ChevronRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    document.title = 'Profile Settings | LearnFlow';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 sticky top-24">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center font-semibold text-xl mr-4">
                    {user?.user_metadata?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.user_metadata?.name}</h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                      {user?.email}
                    </p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-border'
                    }`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Profile Information</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'security'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-border'
                    }`}
                  >
                    <Lock className="w-5 h-5 mr-3" />
                    <span>Security</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-border'
                    }`}
                  >
                    <BellRing className="w-5 h-5 mr-3" />
                    <span>Notifications</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'preferences'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-border'
                    }`}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Preferences</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'billing'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-border'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    <span>Billing</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('help')}
                    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'help'
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-border'
                    }`}
                  >
                    <HelpCircle className="w-5 h-5 mr-3" />
                    <span>Help & Support</span>
                  </button>
                </nav>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-xl font-bold">Profile Information</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Update your personal information and how others see you on the platform
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <form>
                      <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="flex-1">
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            defaultValue="Jane"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            defaultValue="Doe"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="bio" className="block text-sm font-medium mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">
                          Profile Picture
                        </label>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center font-semibold text-xl mr-4">
                            {user?.user_metadata?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <button className="btn-secondary btn-sm mb-1">
                              Change Picture
                            </button>
                            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                              JPG, PNG or GIF. Max size 2MB.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-xl font-bold">Security</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Manage your password and account security settings
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <form>
                      <div className="mb-6">
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="btn-primary">
                          Update Password
                        </button>
                      </div>
                    </form>
                    
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-dark-border">
                      <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-border/30 rounded-lg mb-4">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className="btn-secondary btn-sm">
                          Enable
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-border/30 rounded-lg">
                        <div>
                          <h4 className="font-medium">Connected Devices</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Manage devices that have logged into your account
                          </p>
                        </div>
                        <button className="btn-secondary btn-sm">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-xl font-bold">Notification Settings</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Manage how and when you receive notifications
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Email Notifications</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Course Updates</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Receive updates about your enrolled courses
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Project Invitations</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Receive notifications when invited to join a project
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Forum Replies</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Receive notifications when someone replies to your post
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Promotional Emails</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Receive updates about new courses and features
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-4">Browser Notifications</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Messages</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Receive browser notifications for new messages
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Reminders</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Receive browser notifications for upcoming deadlines
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'preferences' && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-xl font-bold">Preferences</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Customize your learning experience
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold mb-4">Learning Preferences</h3>
                    
                    <div className="mb-6">
                      <label htmlFor="learningGoal" className="block text-sm font-medium mb-1">
                        Primary Learning Goal
                      </label>
                      <select
                        id="learningGoal"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option>Career Change</option>
                        <option>Skill Improvement</option>
                        <option>Professional Certification</option>
                        <option>Personal Interest</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="primaryInterest" className="block text-sm font-medium mb-1">
                        Primary Field of Interest
                      </label>
                      <select
                        id="primaryInterest"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option>Frontend Development</option>
                        <option>Backend Development</option>
                        <option>Full Stack Development</option>
                        <option>Mobile Development</option>
                        <option>Data Science</option>
                        <option>UI/UX Design</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="weeklyHours" className="block text-sm font-medium mb-1">
                        Hours Available Per Week
                      </label>
                      <select
                        id="weeklyHours"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option>Less than 5 hours</option>
                        <option>5-10 hours</option>
                        <option>10-20 hours</option>
                        <option>20+ hours</option>
                      </select>
                    </div>
                    
                    <h3 className="font-semibold mb-4 mt-8">AI Assistant Preferences</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">AI Learning Assistant</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Enable AI recommendations and personalized learning paths
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Personalized Content</h4>
                          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            Allow AI to suggest courses based on your activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'billing' && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-xl font-bold">Billing & Subscription</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Manage your subscription and payment methods
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg mb-8">
                      <div>
                        <h3 className="font-semibold">Current Plan: Free</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                          You're currently on the free plan with limited access
                        </p>
                      </div>
                      <button className="btn-primary btn-sm">
                        Upgrade
                      </button>
                    </div>
                    
                    <h3 className="font-semibold mb-4">Available Plans</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {/* Free Plan */}
                      <div className="border-2 border-gray-200 dark:border-dark-border rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                        <h4 className="font-semibold mb-2">Free</h4>
                        <p className="text-2xl font-bold mb-4">$0<span className="text-sm font-normal text-light-text-secondary dark:text-dark-text-secondary">/month</span></p>
                        <ul className="space-y-2 mb-4 text-sm">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Access to basic courses
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Community forum access
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Limited AI assistant
                          </li>
                        </ul>
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                            Current Plan
                          </span>
                        </div>
                      </div>
                      
                      {/* Pro Plan */}
                      <div className="border-2 border-primary-500 rounded-lg p-4 shadow-lg shadow-primary-100 dark:shadow-primary-900/20">
                        <h4 className="font-semibold mb-2">Pro</h4>
                        <p className="text-2xl font-bold mb-4">$29<span className="text-sm font-normal text-light-text-secondary dark:text-dark-text-secondary">/month</span></p>
                        <ul className="space-y-2 mb-4 text-sm">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            All Free features
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Full course library
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Unlimited AI assistant
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Project-based learning
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Certificate of completion
                          </li>
                        </ul>
                        <button className="btn-primary w-full">
                          Upgrade to Pro
                        </button>
                      </div>
                      
                      {/* Team Plan */}
                      <div className="border-2 border-gray-200 dark:border-dark-border rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                        <h4 className="font-semibold mb-2">Team</h4>
                        <p className="text-2xl font-bold mb-4">$99<span className="text-sm font-normal text-light-text-secondary dark:text-dark-text-secondary">/month</span></p>
                        <ul className="space-y-2 mb-4 text-sm">
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            All Pro features
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Team collaboration tools
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Admin dashboard
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Priority support
                          </li>
                          <li className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Custom learning paths
                          </li>
                        </ul>
                        <button className="btn-secondary w-full">
                          Contact Sales
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-4">Payment Methods</h3>
                    
                    <div className="border border-gray-200 dark:border-dark-border rounded-lg p-4 mb-4">
                      <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
                        No payment methods added yet
                      </p>
                    </div>
                    
                    <button className="btn-secondary">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'help' && (
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                    <h2 className="text-xl font-bold">Help & Support</h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      Get help with any issues or questions you have
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="card hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-semibold mb-2">Help Center</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                          Browse our knowledge base for answers to common questions
                        </p>
                        <button className="btn-secondary w-full flex items-center justify-center">
                          Visit Help Center <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      <div className="card hover:shadow-lg transition-all duration-300">
                        <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                          Get personalized help from our support team
                        </p>
                        <button className="btn-secondary w-full flex items-center justify-center">
                          Contact Support <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 text-left font-medium">
                          <span>How do I reset my password?</span>
                          <ChevronRight className="w-5 h-5 transform rotate-90" />
                        </button>
                        <div className="px-4 pb-4">
                          <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            You can reset your password by clicking on the "Forgot Password" link on the sign-in page. Follow the instructions sent to your email to create a new password.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 text-left font-medium">
                          <span>How do I cancel my subscription?</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 text-left font-medium">
                          <span>Can I download courses for offline viewing?</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                        <button className="w-full flex items-center justify-between p-4 text-left font-medium">
                          <span>How do I get a certificate of completion?</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default ProfilePage;