'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, MapPin, Calendar, Plus, X, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const categories = ['Adventure', 'Social', 'Learning', 'Wellness', 'Gaming', 'Movies', 'Other']


const AddEventModal = ({ isOpen, onClose }) => {
  const [eventData, setEventData] = useState({
    photo: '',
    name: '',
    description: '',
    venue: '',
    datetime: '',
    category: '',
    activities: '',
    maxAttendees: '',
    aboutYou: '',
    expectations: ''
  })
  const [otherCategory, setOtherCategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:5000/api/event-save', eventData)
    .then(({data}) => {

      if(data.message == "DONE"){
        alert("Event Created Successfully");

        const events = JSON.parse(localStorage.getItem('events') || '[]')
        const newEvent = {
          ...eventData,
          id: Date.now(),
          category: eventData.category === 'Other' ? otherCategory : eventData.category
        }
        events.push(newEvent)
        localStorage.setItem('events', JSON.stringify(events))
        
        onClose()
      }
      else
      {
        alert("Error in creating event");
      }

    })
    .catch((error) => {
      console.log(error);
      alert("Error in creating event");
    })

  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setEventData({ ...eventData, photo: reader.result })
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Event</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Event Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Event Name</label>
                <input
                  type="text"
                  required
                  onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                <textarea
                  required
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Venue</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                    className="w-full bg-gray-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    onChange={(e) => setEventData({ ...eventData, datetime: e.target.value })}
                    className="w-full bg-gray-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
                <select
                  required
                  onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {eventData.category === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Specify Other Category</label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setOtherCategory(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg p-2 text-white"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">What will we do?</label>
                <textarea
                  required
                  onChange={(e) => setEventData({ ...eventData, activities: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Maximum Attendees</label>
                <input
                  type="number"
                  required
                  onChange={(e) => setEventData({ ...eventData, maxAttendees: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Something crazy about you</label>
                <textarea
                  required
                  onChange={(e) => setEventData({ ...eventData, aboutYou: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">What to expect?</label>
                <textarea
                  required
                  onChange={(e) => setEventData({ ...eventData, expectations: e.target.value })}
                  className="w-full bg-gray-800 rounded-lg p-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 transition-colors"
              >
                Create Event
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)

  
  const events = JSON.parse(localStorage.getItem('events') || '[]')

  
  const filteredEvents = events
    .filter(event => 
      (selectedCategory === 'all' || event.category === selectedCategory) &&
      (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       event.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.datetime) - new Date(b.datetime)
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="min-h-screen pt-28 bg-gray-900 text-white p-4">

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Events</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Add Event
          </motion.button>
        </div>

        
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-indigo-600' : 'bg-gray-800'
              }`}
            >
              All Events
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category ? 'bg-indigo-600' : 'bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Filter size={20} />
              Filter & Sort
              <ChevronDown size={16} className={`transform transition-transform ${filterMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {filterMenuOpen && (
              <div className="absolute mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold mb-2">Sort by</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={sortBy === 'date'}
                      onChange={() => setSortBy('date')}
                      className="form-radio text-indigo-600"
                    />
                    <span>Date</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={sortBy === 'name'}
                      onChange={() => setSortBy('name')}
                      className="form-radio text-indigo-600"
                    />
                    <span>Name</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <img
                src={event.photo || '/placeholder.svg?height=200&width=400'}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Calendar size={16} />
                  {new Date(event.datetime).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin size={16} />
                  {event.venue}
                </div>
                <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                <Link
                  to={`/event/${event.id}`}
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      
      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

