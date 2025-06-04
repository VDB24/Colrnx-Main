import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, Code, Layout, BookOpenCheck, Brain, 
  Settings, LogOut, GraduationCap, Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
}

function Sidebar({ onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };
  
  const navItems = [
    {
      name: 'Dashboard',
      path: '/learn',
      icon: Layout
    },
    {
      name: 'AI Learning',
      path: '/learn/ai',
      icon: Brain
    },
    {
      name: 'Explore Resources',
      path: '/learn/explore',
      icon: BookOpenCheck
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

  return (
    <aside
      className={`hidden lg:flex flex-col fixed left-4
        bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl 
        shadow-2xl border border-white/20 dark:border-dark-border 
        rounded-xl
        transition-all duration-300 z-20 hover:w-64 ${
          isCollapsed ? 'w-16 px-2' : 'w-64 px-4'
        }`}
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        height: 'auto',
        maxHeight: 'calc(100vh - 6rem)',
        bottom: 'initial'
      }}
      onMouseEnter={() => {
        setIsCollapsed(false);
        onToggle(false);
      }}
      onMouseLeave={() => {
        setIsCollapsed(true);
        onToggle(true);
      }}
    >
      <nav className="flex-1 flex flex-col justify-center space-y-4 py-6 overflow-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

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
              <span className={`ml-3 truncate transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Achievements Link */}
        <Link
          to="/achievements"
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActive('/achievements')
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-border'
          }`}
        >
          <Trophy className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-3 truncate transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Achievements
          </span>
        </Link>

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
          <span className={`ml-3 truncate transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Settings
          </span>
        </Link>

        <div className="mt-6 pt-1.5 border-t border-gray-200 dark:border-dark-border"></div>
        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-3 truncate transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Sign Out
          </span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;