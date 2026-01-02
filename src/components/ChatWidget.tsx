import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Calendar } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  showAppointmentForm?: boolean;
}

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! Welcome to Win Win. I'm here to help answer your questions about our sales programs and career opportunities. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(7)}`);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          message: inputValue,
          conversationId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setConversationId(result.conversationId);
        const assistantMessage: Message = {
          role: 'assistant',
          content: result.message,
          timestamp: new Date(),
          showAppointmentForm: result.showAppointmentForm || false,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        if (result.showAppointmentForm) {
          setShowAppointmentForm(true);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact us directly at office@win-win.si",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const submitAppointment = async () => {
    if (!appointmentData.name || !appointmentData.email || !appointmentData.phone ||
        !appointmentData.preferred_date || !appointmentData.preferred_time) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'appointment',
          conversationId,
          ...appointmentData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const successMessage: Message = {
          role: 'assistant',
          content: "Great! Your appointment has been scheduled successfully. We'll contact you at the provided email and phone number to confirm the details. Is there anything else I can help you with?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);
        setShowAppointmentForm(false);
        setAppointmentData({
          name: '',
          email: '',
          phone: '',
          preferred_date: '',
          preferred_time: '',
          message: '',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, there was an error scheduling your appointment. Please try again or contact us directly at office@win-win.si",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center group hover:shadow-xl hover:shadow-red-500/50 z-50 animate-bounce"
        aria-label="Open chat"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 bg-black border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-red-950/50 to-black rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Win Win Assistant</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 size={18} className="text-gray-400" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black to-neutral-950">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-red-500 text-white rounded-br-none'
                      : 'bg-white/5 text-gray-200 rounded-bl-none border border-white/10'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/5 text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 border border-white/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}

            {showAppointmentForm && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={20} className="text-red-500" />
                  <h3 className="font-semibold text-white">Schedule an Appointment</h3>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={appointmentData.name}
                    onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm placeholder-gray-500"
                  />

                  <input
                    type="email"
                    placeholder="Email *"
                    value={appointmentData.email}
                    onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm placeholder-gray-500"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={appointmentData.phone}
                    onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm placeholder-gray-500"
                  />

                  <input
                    type="date"
                    placeholder="Preferred Date *"
                    value={appointmentData.preferred_date}
                    onChange={(e) => setAppointmentData({ ...appointmentData, preferred_date: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm"
                  />

                  <input
                    type="time"
                    placeholder="Preferred Time *"
                    value={appointmentData.preferred_time}
                    onChange={(e) => setAppointmentData({ ...appointmentData, preferred_time: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm"
                  />

                  <textarea
                    placeholder="Additional Message (Optional)"
                    value={appointmentData.message}
                    onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm placeholder-gray-500 resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={submitAppointment}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                      Schedule Appointment
                    </button>
                    <button
                      onClick={() => setShowAppointmentForm(false)}
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 bg-black rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white placeholder-gray-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-lg hover:shadow-red-500/50"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Win Win AI
            </p>
          </div>
        </>
      )}
    </div>
  );
}
