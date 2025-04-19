import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import StudySessionCard from './components/StudySessionCard';
import AIRecommendationPanel from './components/AIRecommendationPanel';
import ProgressChart from './components/ProgressChart';
import FocusTimer from './components/FocusTimer';
import CreateSessionForm from './components/CreateSessionForm';
import { mockStudyEvents, mockRecommendations, mockProgressData } from './data/mockData';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleCreateSession = (sessionData: any) => {
    console.log('New study session created:', sessionData);
    // In a real app, this would add the session to the database
  };

  // Filter today's sessions for the dashboard
  const today = new Date();
  const todaySessions = mockStudyEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main className="container mx-auto px-4 pt-20 pb-10">
        <section id="dashboard">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mt-8 mb-6`}>
            Smart Study Dashboard
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar Section */}
              <section id="calendar">
                <Calendar 
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  events={mockStudyEvents}
                  isDarkMode={isDarkMode}
                />
              </section>
              
              {/* Create New Session */}
              <section>
                <CreateSessionForm onSubmit={handleCreateSession} isDarkMode={isDarkMode} />
              </section>
              
              {/* Today's Sessions */}
              <section id="subjects">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Today's Study Sessions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaySessions.length > 0 ? (
                    todaySessions.map(session => (
                      <StudySessionCard 
                        key={session.id}
                        title={session.title}
                        subject={session.subject}
                        date={session.date}
                        startTime={session.startTime}
                        endTime={session.endTime}
                        difficulty={session.difficulty}
                        progress={session.progress}
                        color={session.color}
                        isDarkMode={isDarkMode}
                      />
                    ))
                  ) : (
                    <div className={`col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8 text-center`}>
                      <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                        No sessions scheduled for today
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Use the form above to create your first study session!
                      </p>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Progress Chart */}
              <section id="analytics">
                <ProgressChart data={mockProgressData} isDarkMode={isDarkMode} />
              </section>
            </div>
            
            {/* Sidebar - Right Column (1/3 width on large screens) */}
            <div className="space-y-6">
              {/* AI Recommendations */}
              <section>
                <AIRecommendationPanel recommendations={mockRecommendations} isDarkMode={isDarkMode} />
              </section>
              
              {/* Focus Timer */}
              <section>
                <FocusTimer isDarkMode={isDarkMode} />
              </section>
              
              {/* Upcoming Sessions */}
              <section className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-5`}>
                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Upcoming Sessions
                </h2>
                
                <div className="space-y-3">
                  {mockStudyEvents.slice(0, 3).map(session => (
                    <div 
                      key={session.id}
                      className={`flex items-center p-3 rounded-lg ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: session.color }}
                      ></div>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {session.title}
                        </h3>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            weekday: 'short',
                            month: 'short', 
                            day: 'numeric' 
                          })} · {session.startTime}
                        </p>
                      </div>
                      
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${session.color}15`, color: session.color }}
                      >
                        {session.subject}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  View All Sessions →
                </button>
              </section>
            </div>
          </div>
        </section>
      </main>
      
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t py-6`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Smart Study Scheduler · AI-Powered Learning Assistant
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;