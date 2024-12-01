import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { Menu, X, MapPin, ChevronLeft, ChevronRight, Download,MessageCircle , QrCode, Users, Compass, Coffee, Music, Book, Headphones, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import a1 from "../assets/images/a1.jpg"
import a2 from "../assets/images/a2.jpg"
import a3 from "../assets/images/a3.jpg"
import a4 from "../assets/images/a4.jpg"
import a5 from "../assets/images/a7.jpg"
import a6 from "../assets/images/a8.jpg"
import a7 from "../assets/images/a9.jpg"
import a8 from "../assets/images/a10.jpg"
import a9 from "../assets/images/b1.jpg"
import a10 from "../assets/images/b2.jpg"
import a11 from "../assets/images/b3.jpg"
import p1 from "../assets/images/p1.jpg"
import p2 from "../assets/images/p2.jpg"
import p3 from "../assets/images/p3.jpg"
import p4 from "../assets/images/p4.jpg"
import p5 from "../assets/images/p5.jpg"
import p6 from "../assets/images/p7.jpg"
import b1 from "../assets/images/b7.jpg"
import b2 from "../assets/images/b8.jpg"
import b3 from "../assets/images/b5.jpg"
import b4 from "../assets/images/b6.jpg"
import b5 from "../assets/images/c3.jpg"


const heroImages = [
  a1,
  a2,
  a3
];


const features = [
  {
    title: "Discover Your Tribe",
    description: "Find like-minded introverts who share your interests 🌟",
    image: a4,
    icon: <Users className="w-8 h-8 text-indigo-500" />
  },
  {
    title: "Quiet Spaces",
    description: "Explore cozy, low-key meetup spots perfect for introverts 🍵",
    image: a5,
    icon: <Coffee className="w-8 h-8 text-indigo-500" />
  },
  {
    title: "Mindful Connections",
    description: "Build meaningful relationships at your own pace 🤝",
    image: a6,
    icon: <Headphones className="w-8 h-8 text-indigo-500" />
  },
  {
    title: "Recharge Zones",
    description: "Find solitude when you need it, even in group settings 🧘",
    image: a7,
    icon: <Compass className="w-8 h-8 text-indigo-500" />
  }
];


const destinations = [
  { name: "Kyoto", image: p1 },
  { name: "Edinburgh", image: p2 },
  { name: "Vancouver", image: p3 },
  { name: "Copenhagen", image: p4 },
  { name: "Wellington", image: p5 },
  { name: "Reykjavik", image: p6 }
];


const blogPosts = [
  { title: "The Introvert's Guide to Meaningful Connections", image: a8 },
  { title: "Embracing Solitude: The Power of Alone Time", image: a9 },
  { title: "Navigating Social Situations as an Introvert", image: a10 },
  { title: "The Art of Deep Conversations in a Noisy World", image: a11 }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const controls = useAnimation();
  const floatingTextRef = useRef(null);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            x: ['100%', '-100%'],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            },
          });
        } else {
          controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    if (floatingTextRef.current) {
      observer.observe(floatingTextRef.current);
    }

    return () => {
      if (floatingTextRef.current) {
        observer.unobserve(floatingTextRef.current);
      }
    };
  }, [controls]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="relative overflow-x-hidden font-sans">
      

      
      <section className="relative min-h-[80vh] pt-16 overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1,
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative container mx-auto py-24 px-4 h-full flex flex-col items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {currentSlide === 0 && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Connect with Fellow
                  <span className="block text-indigo-400">Introverts</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  Find meaningful connections through shared interests
                </p>
              </>
            )}
            {currentSlide === 1 && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Explore Quiet
                  <span className="block text-indigo-400">Adventures</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  Discover introvert-friendly activities and events
                </p>
              </>
            )}
            {currentSlide === 2 && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Grow at Your
                  <span className="block text-indigo-400">Own Pace</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  Build relationships comfortably and authentically
                </p>
              </>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-indigo-600 rounded-full text-lg font-semibold transition-colors hover:bg-indigo-700"
              >
                Get Started
              </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-indigo-600 rounded-full text-lg font-semibold transition-colors hover:bg-indigo-100"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

       
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-indigo-600' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>


      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            How Find My Buddy Works for Introverts
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      

<section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Your Interests</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Book Club', image: b1 },
            { name: 'Quiet Cafes', image: b2 },
            { name: 'Nature Walks', image: b3 },
            { name: 'Art Galleries', image: a2 },
            { name: 'Meditation', image: a7 },
            { name: 'Board Games', image: a11 }
          ].map((interest, index) => (
            <motion.div
              key={interest.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={interest.image}
                alt={interest.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{interest.name}</h3>
              <p className="text-gray-600">Connect with fellow introverts who share your passion for {interest.name.toLowerCase()}</p>
              <Link to="/events">
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                Explore {interest.name}
              </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      
      <motion.div
        ref={floatingTextRef}
        className="py-12 bg-indigo-600 overflow-hidden"
      >
        <motion.h2
          animate={controls}
          className="text-6xl font-bold text-white/60 whitespace-nowrap"
          style={{ x: "100%" }}
        >
          QUIET • CONNECT • RECHARGE • GROW • EXPLORE
        </motion.h2>
      </motion.div>

      
      <section id="community" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            Join Our Introvert-Friendly Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Connect with like-minded individuals, share experiences, and grow together in a supportive environment designed for introverts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Link to="/events">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
              Join Now
            </button>
            </Link>
          </motion.div>
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Explore Introvert-Friendly Destinations
          </motion.h2>

          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
              {destinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="min-w-[300px] snap-center"
                >
                  <div className="relative group overflow-hidden rounded-xl">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-center">
                        <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                        <MapPin className="inline-block" />
                        <span className="ml-2">Explore</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      
       <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Find Your Introvert Tribe</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Silent Book Club', image: b4 },
            { name: 'Introvert Hikers', image: b3 },
            { name: 'Quiet Game Night', image: a9 },
            { name: 'Mindful Art Class', image: a9 },
            { name: 'Introvert Movie Buffs', image: a10 },
            { name: 'Calm Tech Meetup', image: a11 }
          ].map((activity, index) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
              <p className="text-gray-600">Connect with fellow introverts who enjoy {activity.name.toLowerCase()}</p>
              <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                Join Group
              </motion.button>
            </Link>
            </motion.div>
          ))}
        </div>
      </section>



      <section id="blog" className="py-20">
  <div className="container mx-auto px-4">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center mb-16"
    >
      Insights for Introverts
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {blogPosts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">Discover insights and tips tailored for introverts...</p>
            <a href="#" className="text-indigo-600 hover:underline">Read More</a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Download the Find My Buddy App for Introverts
              </h2>
              <p className="text-gray-600 mb-8">
                Start connecting with like-minded individuals today. Our app is designed with introverts in mind, providing a comfortable space to explore and connect.
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <QrCode size={100} />
                </div>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg transition-colors hover:bg-gray-800"
                  >
                    <Download size={20} />
                    App Store
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg transition-colors hover:bg-gray-800"
                  >
                    <Download size={20} />
                    Play Store
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <img
                src={b5}
                alt="Find My Buddy App Screenshot"
                className="max-w-[300px] mx-auto rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      
      <motion.button
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChatbot}
      >
        <MessageCircle size={24} />
      </motion.button>


      {isChatbotOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-6 z-50"
        >
          <Chatbot onClose={toggleChatbot} />
        </motion.div>
      )}
    </div>
  )
}

