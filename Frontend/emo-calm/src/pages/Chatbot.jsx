import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Loader2, ExternalLink, RotateCcw } from 'lucide-react';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! 💙 I'm EMO-Calm, your compassionate health companion. I'm here to help you understand the connection between your physical symptoms and emotional wellbeing. I'll remember our conversation as we talk. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [conversationContext, setConversationContext] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔗 Function to parse text and convert URLs to clickable links
  const parseMessageWithLinks = (text) => {
    if (!text) return null;

    // First, handle URLs in brackets ['url'] or ["url"]
    text = text.replace(/\['([^']+)'\]|\["([^"]+)"\]/g, (match, url1, url2) => {
      const url = url1 || url2;
      return url;
    });

    // Remove any remaining brackets around URLs
    text = text.replace(/\[([^\]]+)\]/g, '$1');

    // Split text by URLs
    const urlRegex = /(https?:\/\/[^\s,]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      // If this part is a URL
      if (part.match(urlRegex)) {
        // Check if it's a YouTube link
        const isYouTube = part.includes('youtube.com') || part.includes('youtu.be');
        
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 ${
              isYouTube 
                ? 'text-red-600 hover:text-red-700 font-medium' 
                : 'text-blue-600 hover:text-blue-700'
            } underline hover:no-underline transition-colors`}
          >
            {isYouTube ? '🎥 Watch Video' : '🔗 Link'}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      // Regular text
      return <span key={index}>{part}</span>;
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
        console.log('Session started:', data.session_id);
      }
      
      if (data.conversation_context) {
        setConversationContext(data.conversation_context);
      }
      
      const assistantMessage = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
        symptomData: data.matched_symptom ? {
          symptom: data.matched_symptom,
          physical: data.physical_cause,
          emotional: data.emotional_cause,
          tips: data.healing_tips,
          tools: data.healing_tools,
          youtubeLinks: data.youtube_links
        } : null
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. 💙",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = async () => {
    if (!sessionId) {
      setMessages([
        {
          role: 'assistant',
          content: "Hello! 💙 I'm EMO-Calm. How are you feeling today?",
          timestamp: new Date()
        }
      ]);
      setConversationContext(null);
      return;
    }

    try {
      await fetch(`http://localhost:8000/conversation/${sessionId}`, {
        method: 'DELETE'
      });
      
      setMessages([
        {
          role: 'assistant',
          content: "Hello! 💙 I'm EMO-Calm. Let's start fresh. How are you feeling today?",
          timestamp: new Date()
        }
      ]);
      setSessionId(null);
      setConversationContext(null);
      console.log('Conversation cleared');
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 🧩 Helper to extract thumbnail from YouTube link
  const getYouTubeThumbnail = (url) => {
    const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EMO-Calm
                </h1>
                <p className="text-sm text-gray-600">
                  {conversationContext || "Your empathetic health companion"}
                </p>
              </div>
            </div>
            
            <button
              onClick={clearConversation}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Start new conversation"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {sessionId && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                💬 Conversation in progress
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-6 py-4 rounded-2xl shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white text-gray-800 border border-purple-100'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {parseMessageWithLinks(message.content)}
                </div>

                {/* 🎥 YouTube Cards Section */}
                {message.symptomData?.youtubeLinks?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="font-semibold text-purple-600 mb-3">🎥 Helpful Resources:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {message.symptomData.youtubeLinks.map((link, idx) => {
                        const thumbnail = getYouTubeThumbnail(link.url);
                        return (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-50 rounded-xl p-3 hover:bg-purple-100 transition-all shadow-sm group"
                          >
                            {thumbnail && (
                              <img
                                src={thumbnail}
                                alt={link.title}
                                className="rounded-lg w-full mb-2"
                              />
                            )}
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4 text-purple-600 group-hover:text-purple-700" />
                              <h4 className="font-medium text-purple-800 group-hover:underline">
                                {link.title || `Watch Video ${idx + 1}`}
                              </h4>
                            </div>
                            {link.description && (
                              <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-purple-100">
                <div className="flex items-center gap-2 text-purple-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Thinking about what you shared...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-purple-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Share how you're feeling... I'll remember our conversation"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 resize-none transition-colors"
                rows="2"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              💡 I remember our conversation - feel free to ask follow-up questions!
            </p>
            {messages.length > 1 && (
              <p className="text-xs text-purple-600">
                {messages.length - 1} message{messages.length > 2 ? 's' : ''} in this conversation
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}