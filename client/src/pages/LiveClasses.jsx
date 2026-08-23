import React, { useState } from 'react';
import { 
  Radio, Calendar, Clock, Video, User, MessageSquare, Send, Play, CheckCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function LiveClasses() {
  const { liveClasses } = useData();
  const [activeTab, setActiveTab] = useState('live'); // live, upcoming, completed
  const [selectedLiveClass, setSelectedLiveClass] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Rohan Sharma', text: 'Good evening sir!', time: '7:01 PM' },
    { sender: 'Priya Verma', text: 'Sir please explain Q4 remainder shortcut once again', time: '7:03 PM' },
    { sender: 'Prof. S. R. Sharma (Faculty)', text: 'Sure Priya! We are taking Q4 next.', time: '7:04 PM', isFaculty: true }
  ]);
  const [newMsgText, setNewMsgText] = useState('');

  const filteredClasses = liveClasses.filter((l) => l.status === activeTab);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: 'You (Student)', text: newMsgText.trim(), time: 'Just now' }
    ]);
    setNewMsgText('');
  };

  return (
    <div className="container py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Live Interactive Classes</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Attend live lectures with top faculty and clear your doubts instantly</p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'live' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            🔴 Live Now ({liveClasses.filter(l => l.status === 'live').length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'upcoming' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            📅 Upcoming
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'completed' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'
            }`}
          >
            📹 Completed Archives
          </button>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="relative aspect-video bg-slate-950">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-85" />
                <div className="absolute top-3 left-3">
                  {item.status === 'live' && (
                    <span className="badge bg-red-600 text-white font-bold text-[11px]">
                      🔴 LIVE NOW
                    </span>
                  )}
                  {item.status === 'upcoming' && (
                    <span className="badge bg-blue-600 text-white font-bold text-[11px]">
                      UPCOMING
                    </span>
                  )}
                  {item.status === 'completed' && (
                    <span className="badge bg-slate-700 text-white font-bold text-[11px]">
                      RECORDED
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-blue-700">{item.subject}</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.duration}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{item.teacher}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{item.scheduledTime}</span>
                <button
                  onClick={() => setSelectedLiveClass(item)}
                  className={`btn text-xs py-2 px-4 ${
                    item.status === 'live'
                      ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                      : 'btn-primary'
                  }`}
                >
                  {item.status === 'live' ? 'Join Live Now' : 'View Stream'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream View Modal with Interactive Chat */}
      {selectedLiveClass && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl animate-fade-in p-6 bg-slate-950 text-white rounded-2xl border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                <h3 className="font-extrabold text-sm md:text-base text-white">{selectedLiveClass.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedLiveClass(null)}
                className="text-slate-400 hover:text-white font-bold text-xs bg-slate-800 px-3 py-1 rounded-lg"
              >
                Close Stream
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* Left Video Player */}
              <div className="lg:col-span-2 aspect-video bg-black rounded-xl overflow-hidden relative border border-slate-800 flex items-center justify-center">
                <img src={selectedLiveClass.thumbnail} alt="Live" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                      <Radio className="w-7 h-7" />
                    </div>
                    <p className="font-extrabold text-sm text-white">Live Classroom Broadcast Connected</p>
                  </div>
                </div>
              </div>

              {/* Right Live Chatbox */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col justify-between h-[300px] lg:h-auto">
                <div>
                  <h4 className="font-bold text-xs text-slate-300 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-red-500" /> Student Live Chat
                  </h4>
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`p-2 rounded-lg ${msg.isFaculty ? 'bg-blue-950 border border-blue-800' : 'bg-slate-950'}`}>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={`font-bold ${msg.isFaculty ? 'text-amber-400' : 'text-blue-400'}`}>{msg.sender}</span>
                          <span className="text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-300 mt-0.5">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask doubt live..."
                    value={newMsgText}
                    onChange={(e) => setNewMsgText(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 text-xs px-3 py-1.5 rounded-lg text-white focus:outline-none"
                  />
                  <button type="submit" className="btn bg-red-600 text-white p-2 text-xs">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
