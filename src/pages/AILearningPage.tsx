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
      <div className="max-w-3xl mx-auto rounded-2xl p-4 text-sm bg-white dark:bg-dark-card shadow-sm flex flex-col h-full">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
        <div className="flex items-start mb-4">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3 flex-shrink-0">
          <Brain className="w-5 h-5 text-primary-500" />
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-dark-border rounded-xl px-4 py-3">
            <p className="text-sm">Hello! I'm your AI learning assistant. How can I help you today?</p>
          </div>
        </div>
      </div>
    {/* add more messages here */}
    </div>
    
        {/* Message Input - fixed at bottom and centered, smaller */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card rounded-3xl px-4 py-3 shadow-lg z-50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything about programming..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-3xl bg-white dark:bg-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="btn-primary px-6 rounded-3xl flex items-center justify-center text-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AILearningPage;
