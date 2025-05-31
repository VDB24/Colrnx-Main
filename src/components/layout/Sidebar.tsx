import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, Code, Layout, BookOpenCheck, Brain, 
  ChevronDown, ChevronRight, ChevronLeft, Settings, LogOut,
  ChevronLeft as ChevronDoubleLeft, 
  ChevronRight as ChevronDoubleRight 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
}

function Sidebar({ onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLearnExpanded, setIsLearnExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };
  
  const navItems = [
    {
      name: 'Learn',
      path: '/learn',
      icon: Layout,
      submenu: true,
      options: [
        {
          name: 'Explore Resources',
          value: 'explore',
          path: '/learn/explore',
          icon: BookOpenCheck
        },
        {
          name: 'AI Learning',
          value: 'ai',
          path: '/learn/ai',
          icon: Brain
        }
      ]
    },
    {
      name: 'Community',
      path: '/community',
      icon: Users
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: Code
    },
    {
      name: 'Courses',
      path: '/courses',
      icon: BookOpen
    }
  ];

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle(newCollapsedState);
    if (!isCollapsed) {
      setIsLearnExpanded(false);
    }
  };

  return (
    <aside 
      className={`hidden lg:flex h-screen flex-col fixed left-0 top-0 bottom-0 pt-20 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border transition-all duration-300 z-20 ${
        isCollapsed ? 'w-16 px-2' : 'w-64 px-4'
      }`}
    >
      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="mb-6 px-4 py-3 bg-gray-50 dark:bg-dark-border/30 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center font-semibold text-lg">
              {user?.user_metadata?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="font-medium truncate">{user?.user_metadata?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          if (item.submenu) {
            return (
              <div key={item.path} className="space-y-1">
                <button
                  onClick={() => !isCollapsed && setIsLearnExpanded(!isLearnExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg ${
                    active
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border'
                  }`}
                >
                  <div className="flex items-center min-w-0">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 truncate">{item.name}</span>
                        {isLearnExpanded ? (
                          <ChevronDown className="w-4 h-4 ml-auto" />
                        ) : (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </>
                    )}
                  </div>
                </button>
                
                {!isCollapsed && isLearnExpanded && (
                  <div className="ml-9 bg-gray-50 dark:bg-dark-border/30 rounded-lg overflow-hidden">
                    {item.options.map((option) => {
                      const OptionIcon = option.icon;
                      const isSelected = location.pathname === option.path;
                      
                      return (
                        <Link
                          key={option.value}
                          to={option.path}
                          className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                            isSelected
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border'
                          }`}
                        >
                          <OptionIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="ml-3 truncate">{option.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          );
        })}

        {/* Settings Link */}
        <Link
          to="/profile"
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActive('/profile')
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 truncate">Settings</span>}
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 truncate">Sign Out</span>}
        </button>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="mt-4 mb-4 flex items-center justify-center w-full p-2 text-gray-500 hover:text-primary-500 transition-colors"
      >
        {isCollapsed ? (
          <ChevronDoubleRight className="w-5 h-5" />
        ) : (
          <ChevronDoubleLeft className="w-5 h-5" />
        )}
      </button>
    </aside>
  );
}

export default Sidebar;