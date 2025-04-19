import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, Settings } from 'lucide-react';

type FocusTimerProps = {
  initialMinutes?: number;
  initialSeconds?: number;
};

const FocusTimer: React.FC<FocusTimerProps> = ({ 
  initialMinutes = 25,
  initialSeconds = 0
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const totalSeconds = initialMinutes * 60 + initialSeconds;
  const currentSeconds = minutes * 60 + seconds;
  const progress = 1 - (currentSeconds / totalSeconds);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            // Play sound or show notification
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Timer className="mr-2" size={20} />
          <h2 className="font-bold text-lg">Focus Timer</h2>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => {/* Toggle sound */}}
          >
            <Volume2 size={16} />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={toggleSettings}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
      
      {showSettings && (
        <div className="mb-4 p-3 bg-white/10 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Focus Duration</span>
            <select className="bg-white/20 rounded px-2 py-1 text-sm">
              <option>25 min</option>
              <option>30 min</option>
              <option>45 min</option>
              <option>60 min</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Break Duration</span>
            <select className="bg-white/20 rounded px-2 py-1 text-sm">
              <option>5 min</option>
              <option>10 min</option>
              <option>15 min</option>
            </select>
          </div>
        </div>
      )}
      
      <div className="relative flex justify-center items-center my-4">
        <svg className="w-32 h-32">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 58}
            strokeDashoffset={2 * Math.PI * 58 * (1 - progress)}
            transform="rotate(-90 64 64)"
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute text-center">
          <div className="text-2xl font-bold">
            {formatTime(minutes, seconds)}
          </div>
          <div className="text-xs opacity-75">
            Focus Session
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={toggleTimer}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <button
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={resetTimer}
        >
          <RotateCcw size={20} />
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/20 text-center">
        <p className="text-sm opacity-75">
          Stay focused on <span className="font-medium">Advanced Mathematics</span>
        </p>
      </div>
    </div>
  );
};

export default FocusTimer;