import React from 'react';
import { Clock, BookOpen, Brain, BarChart } from 'lucide-react';

type StudySessionCardProps = {
  title: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  difficulty: number;
  progress: number;
  color: string;
};

const StudySessionCard: React.FC<StudySessionCardProps> = ({
  title,
  subject,
  date,
  startTime,
  endTime,
  difficulty,
  progress,
  color,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderDifficulty = () => {
    const dots = [];
    for (let i = 0; i < 5; i++) {
      dots.push(
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < difficulty ? `bg-${color}-500` : 'bg-gray-200'
          }`}
        ></div>
      );
    }
    return dots;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-102 hover:shadow-lg"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {subject}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(date)} · {startTime} - {endTime}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">Difficulty:</span>
            <div className="flex space-x-1 ml-2">
              {renderDifficulty()}
            </div>
          </div>
          
          <div className="flex items-center">
            <Brain size={16} className="mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">Focus Required</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium" style={{ color }}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full"
              style={{ width: `${progress}%`, backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>
      
      <div 
        className="px-4 py-3 flex justify-between items-center border-t border-gray-100"
        style={{ backgroundColor: `${color}05` }}
      >
        <div className="flex items-center">
          <BarChart size={16} className="mr-1" style={{ color }} />
          <span className="text-sm font-medium" style={{ color }}>
            AI Optimized
          </span>
        </div>
        
        <button 
          className="text-xs font-medium px-3 py-1 rounded-md transition-colors"
          style={{ 
            backgroundColor: `${color}10`, 
            color,
            border: `1px solid ${color}25` 
          }}
        >
          Start Session
        </button>
      </div>
    </div>
  );
};

export default StudySessionCard;