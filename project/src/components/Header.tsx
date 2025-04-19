import React, { useState, useEffect } from 'react';
import { BookOpen, BrainCircuit, Bell, Moon, Sun, User, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Study Reminder',
      message: 'Your Mathematics session starts in 30 minutes',
      time: '5 min ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Achievement Unlocked',
      message: 'Completed 5 study sessions this week!',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'New Recommendation',
      message: 'AI suggests studying Physics today',
      time: '2 hours ago',
      isRead: true,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isDarkMode
          ? isScrolled ? 'bg-gray-800 shadow-lg' : 'bg-gray-900'
          : isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      } py-2`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BrainCircuit className="text-purple-600 mr-2" size={28} />
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
              SmartStudy
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('dashboard')}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-600 transition-colors flex items-center ${
                activeSection === 'dashboard' ? 'text-purple-600' : ''
              }`}
            >
              <BookOpen className="mr-1" size={18} />
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('calendar')}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-600 transition-colors ${
                activeSection === 'calendar' ? 'text-purple-600' : ''
              }`}
            >
              Calendar
            </button>
            <button 
              onClick={() => scrollToSection('subjects')}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-600 transition-colors ${
                activeSection === 'subjects' ? 'text-purple-600' : ''
              }`}
            >
              Subjects
            </button>
            <button 
              onClick={() => scrollToSection('analytics')}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-purple-600 transition-colors ${
                activeSection === 'analytics' ? 'text-purple-600' : ''
              }`}
            >
              Analytics
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                } transition-colors`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div 
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } overflow-hidden`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Notifications
                      </h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className={`p-1 rounded-full ${
                          isDarkMode 
                            ? 'hover:bg-gray-700 text-gray-400' 
                            : 'hover:bg-gray-100 text-gray-500'
                        }`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-3 rounded-lg cursor-pointer ${
                            isDarkMode
                              ? notification.isRead ? 'bg-gray-700' : 'bg-gray-700/50'
                              : notification.isRead ? 'bg-gray-50' : 'bg-purple-50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                              {notification.title}
                            </h4>
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </span>
                          </div>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button 
                    className={`w-full p-3 text-sm font-medium text-center ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-colors`}
            >
              {isDarkMode ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;