import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    company?: string;
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      participant: {
        id: '1',
        name: 'Sophie Martin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        role: 'Recruteuse',
        company: 'TechCorp',
        online: true,
      },
      lastMessage: 'Merci pour votre candidature, j\'aimerais en discuter',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      messages: [
        {
          id: '1',
          senderId: '1',
          content: 'Bonjour, j\'ai bien reçu votre candidature pour le poste de développeur.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: true,
        },
        {
          id: '2',
          senderId: 'me',
          content: 'Bonjour Sophie, merci pour votre retour rapide !',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          read: true,
        },
        {
          id: '3',
          senderId: '1',
          content: 'Merci pour votre candidature, j\'aimerais en discuter',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          read: false,
        },
      ],
    },
    // Add more conversations...
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedConv) return;

    // Add message logic here
    setMessageInput('');
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer ${
                selectedConversation === conversation.id ? 'bg-accent/5' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participant.avatar}
                    alt={conversation.participant.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {conversation.participant.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.lastMessageTime).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>