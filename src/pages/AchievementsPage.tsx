import { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  points: number;
  criteria: string;
}

interface UserAchievement {
  achievement_id: string;
  earned_at: string;
  progress: number;
}

function AchievementsPage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    document.title = 'Achievements | LearnFlow';
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      // Load all achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('points', { ascending: false });

      if (achievementsError) throw achievementsError;

      // Load user's achievements
      const { data: userAchievementsData, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user?.id);

      if (userAchievementsError) throw userAchievementsError;

      setAchievements(achievementsData || []);
      setUserAchievements(userAchievementsData || []);

      // Calculate total points
      const points = userAchievementsData?.reduce((total, ua) => {
        const achievement = achievementsData?.find(a => a.id === ua.achievement_id);
        return total + (achievement?.points || 0);
      }, 0);

      setTotalPoints(points || 0);
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  const getAchievementStatus = (achievementId: string) => {
    const userAchievement = userAchievements.find(ua => ua.achievement_id === achievementId);
    if (!userAchievement) return { earned: false, progress: 0 };
    return {
      earned: true,
      progress: userAchievement.progress,
      earnedAt: userAchievement.earned_at
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Achievements</h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Track your progress and unlock achievements
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-500">{totalPoints}</div>
            <div className="text-light-text-secondary dark:text-dark-text-secondary">Total Points</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => {
          const status = getAchievementStatus(achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`card hover:shadow-lg transition-all duration-300 ${
                status.earned
                  ? 'border-primary-500/50 dark:border-primary-500/30'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    status.earned
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-border text-gray-400'
                  }`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                    <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                      <Star className="w-4 h-4 mr-1" />
                      <span>{achievement.points} points</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {achievement.description}
              </p>

              {status.earned ? (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-500">
                    Earned on {formatDate(status.earnedAt)}
                  </span>
                  <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-full text-xs">
                    Completed
                  </span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">
                      Progress
                    </span>
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">
                      {status.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${status.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

export default AchievementsPage;