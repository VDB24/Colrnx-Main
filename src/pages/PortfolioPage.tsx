import { useEffect, useState } from 'react';
import { Code, Award, Users, FileEdit, Download, Share2, Plus, Trophy, Github, Linkedin, Globe } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { RainbowButton } from '../components/ui/rainbow-button';
import { Dialog } from '@headlessui/react'; // or use your own modal component
import { supabase } from '../lib/supabase'; // adjust path as needed

function PortfolioPage() {
  const { user } = useAuth();
  interface Profile {
    github: string;
    linkedin: string;
    website: string;
  }

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showSocialModal, setShowSocialModal] = useState(false);

  useEffect(() => {
    document.title = 'Profile | LearnFlow';
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('github, linkedin, website')
        .eq('id', user.id)
        .single();
      if (!error) setProfile(data);
    }
    fetchProfile();
  }, [user]);

  const socialLinks = [
    {
      name: "GitHub",
      url: profile?.github || "",
      icon: <Github className="w-6 h-6" />
    },
    {
      name: "LinkedIn",
      url: profile?.linkedin || "",
      icon: <Linkedin className="w-6 h-6" />
    },
    {
      name: "Website",
      url: profile?.website || "",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  // Demo data for interests, contributions, achievements, etc.
  const interests = [
    "Frontend Development",
    "AI & Machine Learning",
    "Open Source",
    "UI/UX Design",
    "Mentoring"
  ];

  const contributions = [
    {
      title: "Open Source PRs",
      value: 12,
      icon: <Code className="w-6 h-6 text-primary-500" />
    },
    {
      title: "Community Answers",
      value: 34,
      icon: <Users className="w-6 h-6 text-primary-500" />
    },
    {
      title: "Projects Built",
      value: 5,
      icon: <Code className="w-6 h-6 text-primary-500" />
    }
  ];

  const achievements = [
    {
      title: "React Developer",
      desc: "Completed advanced React course",
      icon: <Award className="w-8 h-8 text-white" />,
      color: "from-[#5164E1] to-[#A7D1F1]"
    },
    {
      title: "5-Day Streak",
      desc: "Learning streak maintained for 5 days",
      icon: <Trophy className="w-8 h-8 text-white" />,
      color: "from-pink-500 to-yellow-400"
    },
    {
      title: "Community Helper",
      desc: "Answered 20+ community questions",
      icon: <Users className="w-8 h-8 text-white" />,
      color: "from-green-400 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 transition-colors duration-500">
      <Header />

      <main className="flex-grow pt-16 md:pt-28 pb-16"> {/* pt-16 mobile, pt-28 desktop */}
        <div className="container max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="relative flex flex-col md:flex-row items-center md:items-center gap-8 mb-12 mt-4 md:mt-8">
            {/* Avatar with glow */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none z-0"
                style={{
                  filter: "blur(32px)",
                  background: "linear-gradient(135deg, #5164E1 0%, #A7D1F1 100%)",
                  opacity: 0.5
                }}
              />
              <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] flex items-center justify-center text-5xl font-bold text-white shadow-xl select-none">
                {user?.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            {/* User Info */}
            <div className="flex-1 flex flex-col justify-center h-36 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white break-words">
                {user?.user_metadata?.name || "User Name"}
              </h1>
              <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto md:mx-0 mb-4">
                Passionate about building impactful products and sharing knowledge. Always learning, always growing.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-3 py-1 rounded-full text-xs font-medium">{user?.email}</span>
              </div>
              <div className="flex gap-3 justify-center md:justify-start">
                <RainbowButton
                  className="text-white dark:text-black shadow-lg hover:shadow-2xl hover:scale-105"
                  onClick={() => setShowSocialModal(true)}
                >
                  Connect
                </RainbowButton>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Interests</h2>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-gradient-to-br from-[#5164E1] to-[#A7D1F1] text-white px-4 py-2 rounded-full text-sm font-medium shadow transition hover:scale-105"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Contributions */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Contributions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {contributions.map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 flex flex-col items-center p-8"
                >
                  <div className="mb-3">{item.icon}</div>
                  <div className="text-3xl font-bold text-primary-500 dark:text-primary-400">{item.value}</div>
                  <div className="text-gray-500 dark:text-gray-300 mt-1">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className={`rounded-2xl p-6 shadow-xl flex flex-col items-center text-center border-2 border-transparent bg-gradient-to-br ${ach.color} relative overflow-hidden`}
                  style={{ minHeight: 180 }}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 mb-4 shadow-lg">
                    {ach.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{ach.title}</h3>
                  <p className="text-white/80 text-sm">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Example Project 1 */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 overflow-hidden flex flex-col">
                <img
                  src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="E-commerce Project"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-xl font-semibold mb-2 text-primary-500 dark:text-primary-400">E-commerce Platform</h4>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 flex-1">
                    A full-featured online store with product management, cart functionality, and payment processing.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-md text-xs">React</span>
                    <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-md text-xs">Node.js</span>
                    <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-md text-xs">MongoDB</span>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <a href="#" className="text-primary-500 text-sm font-medium hover:underline">View Project</a>
                    <a href="#" className="text-primary-500 text-sm font-medium hover:underline">GitHub</a>
                  </div>
                </div>
              </div>
              {/* Example Project 2 */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 overflow-hidden flex flex-col">
                <img
                  src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Task Management App"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-xl font-semibold mb-2 text-primary-500 dark:text-primary-400">Task Management App</h4>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 flex-1">
                    A collaborative task manager with real-time updates, notifications, and team features.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-md text-xs">React</span>
                    <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-md text-xs">Firebase</span>
                    <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-500 px-2 py-1 rounded-md text-xs">Tailwind CSS</span>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <a href="#" className="text-primary-500 text-sm font-medium hover:underline">View Project</a>
                    <a href="#" className="text-primary-500 text-sm font-medium hover:underline">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Tips */}
          <div className="bg-gradient-to-br from-[#5164E1]/10 to-[#A7D1F1]/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary-500 dark:text-primary-400">Tips for a Great Profile</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200">
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  1
                </span>
                <span>Showcase your best projects with clear descriptions of your role and contributions.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  2
                </span>
                <span>Highlight your interests and achievements to stand out.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </span>
                <span>Keep your profile updated with your latest work and accomplishments.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />

      {/* Social Links Modal */}
      <Dialog open={showSocialModal} onClose={() => setShowSocialModal(false)} className="fixed z-50 inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" onClick={() => setShowSocialModal(false)} />
        <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 max-w-sm w-full z-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Connect with {user?.user_metadata?.name || "User"}</h2>
          <ul className="space-y-4">
            {socialLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-500 hover:underline"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mt-6 w-full py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition"
            onClick={() => setShowSocialModal(false)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default PortfolioPage;