import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: StudyEvent[];
};

export type StudyEvent = {
  id: string;
  title: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  color: string;
};

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate, events }) => {
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 p-1"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const isToday = new Date().toDateString() === date.toDateString();
      
      // Filter events for this day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === selectedDate.getMonth() && 
               eventDate.getFullYear() === selectedDate.getFullYear();
      });
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 ${isToday ? 'bg-purple-50' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-purple-600 bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
            {day}
          </div>
          <div className="mt-1 overflow-y-auto max-h-16">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className="text-xs mb-1 p-1 rounded truncate"
                style={{ backgroundColor: `${event.color}20`, color: event.color }}
              >
                {event.startTime} - {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <CalendarIcon className="mr-2" size={20} />
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;