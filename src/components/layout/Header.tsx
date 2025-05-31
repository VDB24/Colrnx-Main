import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Brain } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-card shadow-md py-3">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 ml-4">
          <Brain className="w-8 h-8 text-primary-500" />
          <span className="text-xl font-bold">LearnFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-base hover:text-primary-500 transition-colors">
            Features
          </Link>
          <Link to="/" className="text-base hover:text-primary-500 transition-colors">
            Pricing
          </Link>
          <Link to="/" className="text-base hover:text-primary-500 transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {isAuthenticated ? (
            <Link 
              to="/learn" 
              className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center font-semibold text-lg hover:bg-primary-200 transition-colors"
            >
              {user?.user_metadata?.name?.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="btn-sm btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn-sm btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors mr-2"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          {isAuthenticated && (
            <Link 
              to="/learn" 
              className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center font-semibold text-lg hover:bg-primary-200 transition-colors"
            >
              {user?.user_metadata?.name?.charAt(0).toUpperCase()}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;