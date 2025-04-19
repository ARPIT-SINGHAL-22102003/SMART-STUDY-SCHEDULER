import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Brain, AlertCircle } from 'lucide-react';

type SubjectOption = {
  id: string;
  name: string;
  color: string;
};

const subjects: SubjectOption[] = [
  { id: '1', name: 'Mathematics', color: '#8B5CF6' },
  { id: '2', name: 'Physics', color: '#3B82F6' },
  { id: '3', name: 'Computer Science', color: '#10B981' },
  { id: '4', name: 'Literature', color: '#F59E0B' },
  { id: '5', name: 'History', color: '#EF4444' },
];

type CreateSessionFormProps = {
  onSubmit: (sessionData: any) => void;
};

const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
    difficulty: 3,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form after submission
    setFormData({
      title: '',
      subject: '',
      date: '',
      startTime: '',
      endTime: '',
      difficulty: 3,
      notes: '',
    });
  };

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.color : '#8B5CF6';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Calendar className="mr-2 text-purple-600" size={20} />
        Create New Study Session
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                placeholder="e.g. Quadratic Equations"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getSubjectColor(formData.subject) }}
                ></div>
              </div>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={16} className="text-gray-400" />
                </div>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <div className="flex items-center">
            <Brain size={16} className="text-gray-400 mr-2" />
            <input
              type="range"
              name="difficulty"
              min="1"
              max="5"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              {formData.difficulty}/5
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <AlertCircle size={16} className="text-gray-400" />
            </div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              placeholder="Additional notes for this session..."
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <div className="space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors"
            >
              AI Optimize
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              Create Session
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;