import React, { useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const CommunityPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Community | DevCraft Academy';
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Community</h1>
        <div className="grid gap-6">
          {/* Community content will go here */}
          <p className="text-gray-600">Community features are coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;