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
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-3">AI Learning Assistant</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
          Get personalized learning support powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Chat Section */}
        <div className="lg:col-span-3">
          <div className="card h-[700px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* AI Message */}
              <div className="flex items-start max-w-3xl">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                  <Brain className="w-6 h-6 text-primary-500" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-dark-border rounded-2xl p-6 text-lg">
                    <p>Hello! I'm your AI learning assistant. How can I help you today?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-dark-border p-6">
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about programming..."
                  className="flex-1 px-6 py-4 border border-gray-300 dark:border-dark-border rounded-xl bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                />
                <button type="submit" className="btn-primary px-8 rounded-xl">
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-colors flex items-center group">
                <Sparkles className="w-6 h-6 text-primary-500 mr-4 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Explain a concept</span>
              </button>
              <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-colors flex items-center group">
                <MessageSquare className="w-6 h-6 text-primary-500 mr-4 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Practice coding</span>
              </button>
              <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-colors flex items-center group">
                <Brain className="w-6 h-6 text-primary-500 mr-4 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Get learning path</span>
              </button>
            </div>
          </div>

          {/* Learning Topics */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Suggested Topics</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-6 py-4 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500 font-medium text-lg">
                JavaScript Basics
              </button>
              <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-lg">
                React Hooks
              </button>
              <button className="w-full text-left px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-lg">
                API Integration
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AILearningPage;