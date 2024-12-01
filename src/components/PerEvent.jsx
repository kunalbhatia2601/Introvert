'use client'

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Users, MessageCircle, Share2, Heart, ArrowLeft, Send, Star, ChevronDown, X } from 'lucide-react'

const CategoryBadge = ({ category }) => {
  const categoryColors = {
    Adventure: 'bg-green-500',
    Social: 'bg-blue-500',
    Learning: 'bg-yellow-500',
    Wellness: 'bg-purple-500',
    Gaming: 'bg-red-500',
    Movies: 'bg-pink-500',
    Other: 'bg-gray-500'
  }

  return (
    <span className={`${categoryColors[category] || 'bg-gray-500'} text-white text-xs font-bold px-2 py-1 rounded-full`}>
      {category}
    </span>
  )
}

export default function PerEvent() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAttending, setIsAttending] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [rating, setRating] = useState(0)
  const commentsPerPage = 5

  useEffect(() => {
    
    const events = JSON.parse(localStorage.getItem('events') || '[]')
    const foundEvent = events.find(e => e.id === parseInt(id))
    setEvent(foundEvent)

    
    const eventComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]')
    setComments(eventComments)

    
    const attendees = JSON.parse(localStorage.getItem(`attendees_${id}`) || '[]')
    setIsAttending(attendees.includes('currentUserId'))

    
    const userRating = localStorage.getItem(`rating_${id}_currentUserId`)
    if (userRating) setRating(parseInt(userRating))
  }, [id])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      author: 'Anonymous User',
      timestamp: new Date().toISOString()
    }
    const updatedComments = [...comments, newCommentObj]
    setComments(updatedComments)
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments))
    setNewComment('')
  }

  const handleAttendance = () => {
    const attendees = JSON.parse(localStorage.getItem(`attendees_${id}`) || '[]')
    if (isAttending) {
      const updatedAttendees = attendees.filter(a => a !== 'currentUserId') 
      localStorage.setItem(`attendees_${id}`, JSON.stringify(updatedAttendees))
    } else {
      attendees.push('currentUserId') 
      localStorage.setItem(`attendees_${id}`, JSON.stringify(attendees))
    }
    setIsAttending(!isAttending)
  }

  const handleRating = (value) => {
    setRating(value)
    localStorage.setItem(`rating_${id}_currentUserId`, value) 
  }

  const ShareModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-800 p-6 rounded-lg max-w-sm w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Share this event</h3>
          <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Share on Facebook
          </button>
          <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors">
            Share on Twitter
          </button>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Share on WhatsApp
          </button>
          <div className="relative">
            <input
              type="text"
              value={`https://introvert-meetup.com/event/${id}`}
              readOnly
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg pr-20"
            />
            <button
              onClick={() => navigator.clipboard.writeText(`https://introvert-meetup.com/event/${id}`)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  if (!event) return null


  const indexOfLastComment = currentPage * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment)
  const totalPages = Math.ceil(comments.length / commentsPerPage)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <div className="relative h-[60vh]">
        <img
          src={event.photo || '/placeholder.svg?height=600&width=1200'}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <Link
          to="/events"
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft />
          Back to Events
        </Link>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 -mt-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <CategoryBadge category={event.category} />
          </div>
          
          <div className="flex flex-wrap gap-6 text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              {new Date(event.datetime).toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              {event.venue}
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} />
              {event.maxAttendees} spots
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">About This Event</h2>
              <p className="text-gray-300">{event.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">What We'll Do</h2>
              <p className="text-gray-300">{event.activities}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">What to Expect</h2>
              <p className="text-gray-300">{event.expectations}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">About the Host</h2>
              <p className="text-gray-300">{event.aboutYou}</p>
            </section>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAttendance}
                className={`flex-1 ${isAttending ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg transition-colors`}
              >
                {isAttending ? 'Cancel Attendance' : 'Request to Join'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareModal(true)}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Share2 size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Heart size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        
        <div className="mt-12 bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Rate this Event</h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRating(star)}
              >
                <Star
                  size={32}
                  className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                />
              </motion.button>
            ))}
          </div>
        </div>


        <div className="mt-12 bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          

          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </form>


          <div className="space-y-6">
            {currentComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{comment.author}</h3>
                  <span className="text-sm text-gray-400">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.text}</p>
              </motion.div>
            ))}
          </div>


          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(totalPages)].map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1 ? 'bg-indigo-600' : 'bg-gray-700'
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>


      <AnimatePresence>
        {showShareModal && <ShareModal />}
      </AnimatePresence>
    </div>
  )
}

