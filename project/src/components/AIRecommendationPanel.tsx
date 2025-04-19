import React from 'react';
import { BrainCircuit, Zap, TrendingUp, Clock } from 'lucide-react';

type Recommendation = {
  id: string;
  title: string;
  description: string;
  icon: string;
  time: string;
  benefit: string;
};

type AIRecommendationPanelProps = {
  recommendations: Recommendation[];
};

const AIRecommendationPanel: React.FC<AIRecommendationPanelProps> = ({ recommendations }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <BrainCircuit size={18} className="text-indigo-500" />;
      case 'zap':
        return <Zap size={18} className="text-yellow-500" />;
      case 'trending':
        return <TrendingUp size={18} className="text-green-500" />;
      case 'clock':
        return <Clock size={18} className="text-blue-500" />;
      default:
        return <BrainCircuit size={18} className="text-indigo-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-md p-5">
      <div className="flex items-center mb-4">
        <BrainCircuit className="mr-2 text-purple-600" size={22} />
        <h2 className="text-lg font-bold text-gray-800">AI Study Recommendations</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-5">
        Based on your study patterns and optimal productivity times, we recommend:
      </p>
      
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="bg-white rounded-lg p-3 shadow-sm flex items-start hover:shadow-md transition-shadow"
          >
            <div className="p-2 rounded-md bg-gray-50 mr-3">
              {getIcon(rec.icon)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                <span className="text-xs font-medium text-gray-500">{rec.time}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
              
              <div className="flex items-center">
                <Zap size={14} className="text-yellow-500 mr-1" />
                <span className="text-xs font-medium text-gray-700">{rec.benefit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md py-2 font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors">
        Apply AI Schedule
      </button>
    </div>
  );
};

export default AIRecommendationPanel;