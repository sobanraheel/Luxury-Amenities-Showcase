import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Waves, 
  Dumbbell, 
  Film, 
  Cpu, 
  Coffee, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface Amenity {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  tag: string;
}

const amenities: Amenity[] = [
  {
    id: 1,
    title: "Infinity Pool",
    description: "Experience breathtaking views from our heated infinity pool, designed to blend seamlessly with the horizon.",
    icon: <Waves className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=2000",
    tag: "WELLNESS"
  },
  {
    id: 2,
    title: "Sky Gym",
    description: "Elevate your workout with state-of-the-art equipment and panoramic city views on the 45th floor.",
    icon: <Dumbbell className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000",
    tag: "FITNESS"
  },
  {
    id: 3,
    title: "Private Cinema",
    description: "Immerse yourself in cinematic excellence with 4K laser projection and Dolby Atmos surround sound.",
    icon: <Film className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000",
    tag: "ENTERTAINMENT"
  },
  {
    id: 4,
    title: "Smart Living",
    description: "Fully integrated home automation systems allowing you to control your environment with a single touch.",
    icon: <Cpu className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2000",
    tag: "TECHNOLOGY"
  },
  {
    id: 5,
    title: "Artisan Lounge",
    description: "A sophisticated space for residents to unwind, featuring premium coffee service and curated library.",
    icon: <Coffee className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000",
    tag: "LIFESTYLE"
  }
];

export default function AmenitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % amenities.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + amenities.length) % amenities.length);
  };

  useEffect(() => {
    const timer = setInterval(slideNext, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 },
              scale: { duration: 0.8 }
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
            <img
              src={amenities[currentIndex].image}
              alt={amenities[currentIndex].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`meta-${currentIndex}`}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase">
              {amenities[currentIndex].tag}
            </span>
            <div className="h-[1px] w-12 bg-white/30" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif italic mb-8 leading-tight tracking-tight">
                {amenities[currentIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light mb-12">
                {amenities[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-8">
            <button 
              onClick={slidePrev}
              className="group relative w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all hover:bg-white hover:border-white"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-black transition-colors" />
            </button>
            <button 
              onClick={slideNext}
              className="group relative w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all hover:bg-white hover:border-white"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
            </button>
            
            <div className="hidden md:flex items-center gap-4 ml-8">
              {amenities.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side Navigation / Info */}
      <div className="absolute right-0 top-0 h-full hidden lg:flex flex-col justify-between py-20 px-12 z-30 border-l border-white/10 backdrop-blur-sm bg-black/5">
        <div className="flex flex-col gap-12">
          {amenities.map((amenity, idx) => (
            <button
              key={amenity.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`flex items-center gap-4 group transition-all ${
                idx === currentIndex ? 'opacity-100' : 'opacity-30 hover:opacity-60'
              }`}
            >
              <div className={`p-3 rounded-xl border transition-all ${
                idx === currentIndex ? 'bg-white border-white text-black' : 'border-white/20 text-white'
              }`}>
                {amenity.icon}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">0{idx + 1}</p>
                <p className="text-sm font-medium tracking-tight">{amenity.title}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-white/40">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Premium Access</span>
          </div>
          <p className="text-[10px] text-white/20 max-w-[150px] leading-tight">
            Exclusive amenities for residents of The Horizon Towers.
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-40">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
          className="h-full bg-white/40"
        />
      </div>
    </div>
  );
}
