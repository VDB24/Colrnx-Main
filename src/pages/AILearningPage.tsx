import { useEffect, useState } from 'react';
import { Brain, MessageSquare, Sparkles, Send } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

function AILearningPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'AI Learning | LearnFlow';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage('');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Learning Assistant</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Get personalized learning support powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chat Section */}
        <div className="lg:col-span-2">
          <div className="card h-[600px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                  <Brain className="w-5 h-5 text-primary-500" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-dark-border rounded-lg p-4 max-w-[80%]">
                    <p>Hello! I'm your AI learning assistant. How can I help you today?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-dark-border p-4">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about programming..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button type="submit" className="btn-primary">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors flex items-center">
                <Sparkles className="w-5 h-5 text-primary-500 mr-3" />
                Explain a concept
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors flex items-center">
                <MessageSquare className="w-5 h-5 text-primary-500 mr-3" />
                Practice coding
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors flex items-center">
                <Brain className="w-5 h-5 text-primary-500 mr-3" />
                Get learning path
              </button>
            </div>
          </div>

          {/* Learning Topics */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Suggested Topics</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-500">
                JavaScript Basics
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors">
                React Hooks
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors">
                API Integration
              </button>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Learning Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Goal</span>
                  <span className="text-primary-500">4/5 topics</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Progress</span>
                  <span className="text-primary-500">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AILearningPage;