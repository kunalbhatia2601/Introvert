import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Paperclip, Image, Smile, MoreVertical, ChevronLeft, Filter } from 'lucide-react';

const users = [
  { id: 1, name: "Emma Watson", avatar: "/placeholder.svg?height=50&width=50&text=EW", lastMessage: "Looking forward to our book club meetup!", time: "2m ago", unread: true },
  { id: 2, name: "Tom Hardy", avatar: "/placeholder.svg?height=50&width=50&text=TH", lastMessage: "The hiking trail was amazing!", time: "1h ago", unread: false },
  { id: 3, name: "Zoe Saldana", avatar: "/placeholder.svg?height=50&width=50&text=ZS", lastMessage: "Loved the quiet cafe you recommended.", time: "3h ago", unread: true },
  { id: 4, name: "Chris Evans", avatar: "/placeholder.svg?height=50&width=50&text=CE", lastMessage: "Are we still on for the art gallery visit?", time: "1d ago", unread: false },
  { id: 5, name: "Natalie Portman", avatar: "/placeholder.svg?height=50&width=50&text=NP", lastMessage: "The meditation session was so relaxing!", time: "2d ago", unread: true },
];

const messages = [
  { id: 1, sender: "Emma Watson", content: "Hey! Are you excited about our book club meetup tomorrow?", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", content: "I just finished the book last night. It was fascinating!", time: "10:32 AM", isOwn: true },
  { id: 3, sender: "Emma Watson", content: "That's great! I can't wait to discuss it. By the way, have you heard about the new quiet cafe that opened downtown?", time: "10:35 AM", isOwn: false },
  { id: 4, sender: "You", content: "No, I haven't! Is it good for reading or working?", time: "10:37 AM", isOwn: true },
  { id: 5, sender: "Emma Watson", content: "It's perfect for both! They have these cozy nooks with soft lighting and comfortable chairs. Plus, they have a strict 'quiet zone' policy.", time: "10:40 AM", isOwn: false },
  { id: 6, sender: "You", content: "That sounds amazing! We should check it out after our meetup tomorrow.", time: "10:42 AM", isOwn: true },
  { id: 7, sender: "Emma Watson", content: "Definitely! It'll be a great way to unwind and reflect on our discussion.", time: "10:45 AM", isOwn: false },
];

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showSidebar, setShowSidebar] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: showSidebar ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="w-80 bg-white border-r border-gray-200 flex flex-col"
      >
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="mt-4 flex items-center text-sm text-gray-600 hover:text-indigo-600">
            <Filter size={16} className="mr-2" />
            Filter conversations
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map(user => (
            <motion.div
              key={user.id}
              whileHover={{ backgroundColor: "#f3f4f6" }}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-4 cursor-pointer border-b ${selectedUser?.id === user.id ? 'bg-indigo-50' : ''}`}
            >
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{user.time}</p>
                {user.unread && <div className="w-3 h-3 bg-indigo-600 rounded-full mt-1 ml-auto"></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-white border-b p-4 flex items-center justify-between">
              <div className="flex items-center">
                <button onClick={() => setShowSidebar(!showSidebar)} className="mr-4 md:hidden">
                  <ChevronLeft size={24} />
                </button>
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h2 className="font-semibold">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-600">Online</p>
                </div>
              </div>
              <button className="text-gray-600 hover:text-indigo-600">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                    message.isOwn ? 'bg-indigo-600 text-white' : 'bg-white'
                  }`}>
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? 'text-indigo-200' : 'text-gray-500'}`}>{message.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="bg-white border-t p-4">
              <div className="flex items-center">
                <button type="button" className="text-gray-500 hover:text-indigo-600 mr-2">
                  <Paperclip size={20} />
                </button>
                <button type="button" className="text-gray-500 hover:text-indigo-600 mr-2">
                  <Image size={20} />
                </button>
                <button type="button" className="text-gray-500 hover:text-indigo-600 mr-2">
                  <Smile size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="ml-2 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-2xl text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

