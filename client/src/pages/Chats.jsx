import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Shield, Search, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Chats() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, senderName: 'Prof. S. R. Sharma', senderRole: 'teacher', message: 'Welcome to Pure Maths Doubts Channel! Feel free to paste your questions.', timestamp: '10:00 AM' },
    { id: 2, senderName: 'Kavitha R.', senderRole: 'student', message: 'Sir, what is the shortcut formula for remainder when 7^84 is divided by 342?', timestamp: '10:15 AM' },
    { id: 3, senderName: 'Prof. S. R. Sharma', senderRole: 'teacher', message: 'Convert 7^84 into (7^3)^28 = 343^28. Now 343 mod 342 = 1. So 1^28 = 1. Answer is 1!', timestamp: '10:18 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderName: user ? user.name : 'Student',
      senderRole: user ? user.role : 'student',
      message: inputMsg.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" /> Student Faculty Chat
          </h1>
          <p className="text-xs text-slate-500">Ask doubts directly to course teachers and join discussion groups</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[600px]">
        
        {/* Left Channels List */}
        <div className="border-r border-slate-200 p-4 space-y-3 bg-slate-50">
          <h3 className="font-extrabold text-xs uppercase text-slate-500 tracking-wider">Active Doubt Channels</h3>
          
          <div className="space-y-1">
            <button className="w-full p-3 rounded-xl bg-blue-600 text-white text-left font-bold text-xs flex items-center justify-between shadow-sm">
              <span>Pure Maths CGL Group</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>
            <button className="w-full p-3 rounded-xl hover:bg-slate-200 text-slate-700 text-left font-semibold text-xs flex items-center justify-between">
              <span>AP Police SI Batch Chat</span>
            </button>
            <button className="w-full p-3 rounded-xl hover:bg-slate-200 text-slate-700 text-left font-semibold text-xs flex items-center justify-between">
              <span>RRB NTPC Speed Math</span>
            </button>
          </div>
        </div>

        {/* Right Chat Messages Area */}
        <div className="lg:col-span-3 flex flex-col justify-between p-4 bg-slate-50/50">
          
          {/* Messages Stream */}
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
            {messages.map((msg) => {
              const isMe = user && msg.senderName === user.name;
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1">
                    <span className="font-bold text-slate-800">{msg.senderName}</span>
                    {msg.senderRole === 'teacher' && (
                      <span className="badge bg-amber-100 text-amber-900 text-[9px] font-bold">Faculty</span>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Send Input */}
          <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-200 mt-2">
            <input
              type="text"
              placeholder="Type your math/reasoning doubt here..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-white border border-slate-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button type="submit" className="btn btn-primary text-xs py-2.5 px-5">
              Send <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
