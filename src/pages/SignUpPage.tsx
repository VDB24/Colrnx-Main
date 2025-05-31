import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Github, Linkedin, Mail, Lock, Eye, EyeOff, User, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = 'Sign Up | LearnFlow';
    
    // If already authenticated, redirect to the dashboard
    if (isAuthenticated) {
      navigate('/learn', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Password strength indicators
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;
  
  const passwordStrength = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;
  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    if (passwordStrength === 4) return 'Strong';
    return 'Very Strong';
  };
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    if (passwordStrength === 4) return 'bg-green-500';
    return 'bg-green-500';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Please choose a stronger password');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      await signup(name, email, password);
      // Successfully signed up, redirect handled by useEffect
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <Brain className="w-8 h-8 text-primary-500 mr-2" />
            <span className="text-2xl font-bold">LearnFlow</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Start your learning journey today
          </p>
        </div>
        
        {/* Form */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Password strength:</span>
                    <span className="text-xs font-medium">{getPasswordStrengthLabel()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getPasswordStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-xs">
                      {isLongEnough ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {hasLowerCase ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>Lowercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {hasUpperCase ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>Uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {hasNumber ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>Number</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {hasSpecialChar ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
              )}
            </div>
            
            {/* Goal Field (Optional) */}
            <div className="mb-6">
              <label htmlFor="goal" className="block text-sm font-medium mb-1">
                What's your goal? (Optional)
              </label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select your goal</option>
                <option value="career-change">Change careers</option>
                <option value="skill-up">Gain new skills</option>
                <option value="certification">Get certified</option>
                <option value="hobby">Learn as a hobby</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200 dark:border-dark-border"></div>
            <span className="flex-shrink mx-4 text-light-text-secondary dark:text-dark-text-secondary text-sm">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-200 dark:border-dark-border"></div>
          </div>
          
          {/* Social Signups */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
              <Github className="w-5 h-5" />
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Sign In Link */}
        <p className="text-center mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary-500 hover:text-primary-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;