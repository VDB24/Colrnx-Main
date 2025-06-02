import { useEffect, useState } from 'react';
import { Brain, Send } from 'lucide-react';
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
      <div className="h-[calc(100vh-6rem)] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* AI Message */}
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                <Brain className="w-6 h-6 text-primary-500" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-dark-border rounded-2xl px-6 py-4">
                  <p className="text-lg">Hello! I'm your AI learning assistant. How can I help you today?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input - Now fixed to bottom */}
        <div className="sticky bottom-0 border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card px-4 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about programming..."
                className="flex-1 px-6 py-4 border border-gray-300 dark:border-dark-border rounded-xl bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit" 
                className="btn-primary px-8 rounded-xl flex items-center justify-center"
              >
                <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AILearningPage;