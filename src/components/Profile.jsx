'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Settings, Edit2, Plus, Camera, Trash2, ChevronDown, Rocket, Users, Briefcase, GraduationCap, MapPin, Baby, Sparkles, Github, Linkedin, Twitter, Instagram, Facebook, Link, Save, ArrowLeft } from 'lucide-react'

const lookingForOptions = [
  { id: 'hobbies', label: 'Practice Hobbies', icon: '🎨' },
  { id: 'socialize', label: 'Socialize', icon: '💭' },
  { id: 'friends', label: 'Make Friends', icon: '👥' },
  { id: 'network', label: 'Professionally Network', icon: '💼' },
]

const interestOptions = [
  'Small Business Marketing', 'Group Singing', 'Poker', 'Acoustic Guitar',
  'Photography', 'Hiking', 'Cooking', 'Reading', 'Traveling', 'Yoga',
  'Painting', 'Dancing', 'Writing', 'Coding', 'Gardening', 'Other'
]

const aboutMeOptions = [
  { id: 'graduate', label: 'Recent Graduate', icon: <GraduationCap size={20} /> },
  { id: 'student', label: 'Student', icon: '🎒' },
  { id: 'newInTown', label: 'New In Town', icon: <MapPin size={20} /> },
  { id: 'emptyNester', label: 'New Empty Nester', icon: '🏠' },
  { id: 'retired', label: 'Newly Retired', icon: <Edit2 size={20} /> },
  { id: 'parent', label: 'New Parent', icon: <Baby size={20} /> },
  { id: 'careerChange', label: 'Career Change', icon: <Briefcase size={20} /> },
]

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    avatar: null,
    lookingFor: [],
    interests: [],
    customInterests: [],
    aboutMe: [],
    bio: '',
    skills: {},
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
      website: ''
    },
    customAboutMe: []
  })
  
  const [showAddInterest, setShowAddInterest] = useState(false)
  const [newInterest, setNewInterest] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [showAddCustomAboutMe, setShowAddCustomAboutMe] = useState(false)
  const [newCustomAboutMe, setNewCustomAboutMe] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData')
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData))
  }, [profileData])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleLookingFor = (option) => {
    setProfileData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(option.id)
        ? prev.lookingFor.filter(id => id !== option.id)
        : [...prev.lookingFor, option.id]
    }))
  }

  const addInterest = (interest) => {
    if (interest === 'Other') {
      setShowAddInterest(true)
      return
    }
    
    if (!profileData.interests.includes(interest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, interest],
        skills: { ...prev.skills, [interest]: 'Beginner' }
      }))
    }
  }

  const removeInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest),
      customInterests: prev.customInterests.filter(i => i !== interest),
      skills: Object.fromEntries(Object.entries(prev.skills).filter(([key]) => key !== interest))
    }))
  }

  const addCustomInterest = () => {
    if (newInterest.trim() && !profileData.customInterests.includes(newInterest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest],
        customInterests: [...prev.customInterests, newInterest],
        skills: { ...prev.skills, [newInterest]: 'Beginner' }
      }))
      setNewInterest('')
      setShowAddInterest(false)
    }
  }

  const toggleAboutMe = (optionId) => {
    setProfileData(prev => ({
      ...prev,
      aboutMe: prev.aboutMe.includes(optionId)
        ? prev.aboutMe.filter(id => id !== optionId)
        : [...prev.aboutMe, optionId]
    }))
  }

  const addCustomAboutMe = () => {
    if (newCustomAboutMe.trim()) {
      setProfileData(prev => ({
        ...prev,
        customAboutMe: [...prev.customAboutMe, newCustomAboutMe]
      }))
      setNewCustomAboutMe('')
      setShowAddCustomAboutMe(false)
    }
  }

  const removeCustomAboutMe = (item) => {
    setProfileData(prev => ({
      ...prev,
      customAboutMe: prev.customAboutMe.filter(i => i !== item)
    }))
  }

  const updateSkillLevel = (interest, level) => {
    setProfileData(prev => ({
      ...prev,
      skills: { ...prev.skills, [interest]: level }
    }))
  }

  const updateSocialLink = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    
    console.log('Saving profile data:', profileData)
    
    localStorage.setItem('profileData', JSON.stringify(profileData))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? <Save size={24} /> : <Edit2 size={24} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            >
              <Settings size={24} />
            </motion.button>
          </div>
        </div>


        <div className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden"
            >
              {profileData.avatar ? (
                <img 
                  src={profileData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl">{profileData.name ? profileData.name[0].toUpperCase() : 'M'}</span>
              )}
            </motion.div>
            {isEditing && (
              <motion.label
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 cursor-pointer"
              >
                <Camera size={24} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
              </motion.label>
            )}
          </div>
        </div>


        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        </motion.section>

        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold">I'm looking to</h2>
          <div className="grid grid-cols-2 gap-4">
            {lookingForOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => isEditing && toggleLookingFor(option)}
                disabled={!isEditing}
                className={`p-4 rounded-lg border-2 border-dashed flex items-center gap-2
                  ${profileData.lookingFor.includes(option.id)
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                  } ${!isEditing && 'cursor-default'}`}
              >
                <span className="text-xl">{option.icon}</span>
                <span>{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>


        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold">
            Interests and Skills ({profileData.interests.length})
          </h2>
          <div className="space-y-4">
            {profileData.interests.map((interest) => (
              <div key={interest} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                <span>{interest}</span>
                <div className="flex items-center gap-4">
                  <select
                    value={profileData.skills[interest]}
                    onChange={(e) => updateSkillLevel(interest, e.target.value)}
                    disabled={!isEditing}
                    className="bg-gray-600 rounded-lg px-2 py-1"
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeInterest(interest)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddInterest(true)}
              className="w-full bg-indigo-600 rounded-lg px-4 py-2 mt-4 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Interest
            </motion.button>
          )}

          
          <AnimatePresence>
            {showAddInterest && (
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
                  className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
                >
                  <h3 className="text-xl font-semibold mb-4">Add Interest</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <motion.button
                          key={interest}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addInterest(interest)}
                          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
                        >
                          {interest}
                        </motion.button>
                      ))}
                    </div>
                    {newInterest && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Enter custom interest"
                          className="flex-1 bg-gray-700 rounded-lg px-4 py-2"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addCustomInterest}
                          className="bg-indigo-600 rounded-lg px-4 py-2"
                        >
                          Add
                        </motion.button>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddInterest(false)}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 mt-4"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold">About me</h2>
          <div className="grid grid-cols-2 gap-4">
            {aboutMeOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => isEditing && toggleAboutMe(option.id)}
                disabled={!isEditing}
                className={`p-4 rounded-lg border-2 border-dashed flex items-center gap-2
                  ${profileData.aboutMe.includes(option.id)
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                  } ${!isEditing && 'cursor-default'}`}
              >
                <span className="text-xl">{option.icon}</span>
                <span>{option.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="space-y-2">
            {profileData.customAboutMe.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
                <span>{item}</span>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeCustomAboutMe(item)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddCustomAboutMe(true)}
              className="w-full bg-indigo-600 rounded-lg px-4 py-2 mt-4 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Custom About Me
            </motion.button>
          )}

          
          <AnimatePresence>
            {showAddCustomAboutMe && (
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
                  className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
                >
                  <h3 className="text-xl font-semibold mb-4">Add Custom About Me</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newCustomAboutMe}
                      onChange={(e) => setNewCustomAboutMe(e.target.value)}
                      placeholder="Enter custom about me"
                      className="w-full bg-gray-700 rounded-lg px-4 py-2"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCustomAboutMe}
                      className="w-full bg-indigo-600 rounded-lg px-4 py-2"
                    >
                      Add
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddCustomAboutMe(false)}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold">Bio</h2>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative"
          >
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Introduce yourself to others on Meetup. This can be short and simple."
              disabled={!isEditing}
              className="w-full h-32 bg-gray-700 rounded-lg p-4 resize-none focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </motion.div>
        </motion.section>


        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profileData.socialLinks).map(([platform, link]) => (
              <div key={platform} className="flex items-center gap-2">
                {platform === 'github' && <Github size={20} />}
                {platform === 'linkedin' && <Linkedin size={20} />}
                {platform === 'twitter' && <Twitter size={20} />}
                {platform === 'instagram' && <Instagram size={20} />}
                {platform === 'facebook' && <Facebook size={20} />}
                {platform === 'website' && <Link size={20} />}
                <input
                  type="url"
                  value={link}
                  onChange={(e) => updateSocialLink(platform, e.target.value)}
                  placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  disabled={!isEditing}
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

