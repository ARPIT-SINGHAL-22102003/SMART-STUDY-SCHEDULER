import React from 'react';
import { BarChart3, ArrowUp, ArrowDown } from 'lucide-react';

type SubjectProgress = {
  subject: string;
  progress: number;
  goal: number;
  color: string;
  change: number;
};

type ProgressChartProps = {
  data: SubjectProgress[];
};

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="mr-2 text-purple-600" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Study Progress</h2>
        </div>
        <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.subject}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="font-medium text-gray-700">{item.subject}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">
                  {item.progress}/{item.goal} hrs
                </span>
                <div className={`flex items-center text-xs ${
                  item.change > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change > 0 ? (
                    <ArrowUp size={12} className="mr-1" />
                  ) : (
                    <ArrowDown size={12} className="mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
            
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ 
                  width: `${(item.progress / item.goal) * 100}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">Weekly Target</p>
            <p className="font-bold text-xl text-gray-800">16h 20m</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Completed</p>
            <p className="font-bold text-xl text-green-500">12h 45m</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Remaining</p>
            <p className="font-bold text-xl text-indigo-500">3h 35m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;