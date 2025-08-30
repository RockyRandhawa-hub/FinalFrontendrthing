import React, { useState, useEffect, useRef } from 'react';
import { Users, Eye, TrendingUp, Globe } from 'lucide-react';

const LiveCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

  // Fetch live visitor count from backend
  const fetchVisitorCount = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:8080/api/v1/admin/getcount");
      const data = await response.json();
      
      if (data.success) {
        setVisitorCount(data.data.count);
      }
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      // Fallback count for demo purposes
      setVisitorCount(1001);
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animated counter effect
  useEffect(() => {
    if (isVisible && visitorCount > 0) {
      let startTime = null;
      const duration = 2500; // 2.5 seconds animation

      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * visitorCount);
        
        setDisplayCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isVisible, visitorCount]);

  // Fetch data on component mount
  useEffect(() => {
    fetchVisitorCount();
    
    // Optional: Set up interval to refresh count periodically
    const interval = setInterval(fetchVisitorCount, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-500/10 rounded-full animate-bounce delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 italic" style={{ fontFamily: "Kaushan" }}>
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Live Heritage
            </span>
            <br />
            <span className="text-white">Explorer Count</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 text-gray-300 mb-8" style={{ fontFamily: "Montserrat" }}>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
            <Globe className="w-5 h-5 text-green-400 animate-spin" />
            <span className="text-lg">Discover • Explore • Honor</span>
            <Globe className="w-5 h-5 text-blue-400 animate-spin" />
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
          </div>
        </div>

        {/* Main Counter Display */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
            
            {/* Main counter card */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              {/* Loading state */}
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-green-400"></div>
                </div>
              ) : (
                <div className="text-center">
                  {/* Counter number */}
                  <div className="text-6xl md:text-8xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent tabular-nums">
                      {formatNumber(displayCount)}
                    </span>
                  </div>
                  
                  {/* Counter label */}
                  <div className="text-white text-xl md:text-2xl font-semibold mb-2" style={{ fontFamily: "Montserrat" }}>
                    Heritage Explorers
                  </div>
                  
                  {/* Live indicator */}
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-sm font-medium">LIVE</span>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 delay-500"></div>
                  </div>
                </div>
              )}
              
              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-green-400 rounded-tl-lg"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-yellow-400 rounded-tr-lg"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-orange-400 rounded-br-lg"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Visitors Today */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold" style={{ fontFamily: "Montserrat" }}>Today's Visitors</h3>
                <p className="text-gray-300 text-sm">New explorers joining</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 tabular-nums">
              +{Math.floor(displayCount * 0.04)}
            </div>
          </div>

          {/* Total Heritage Sites */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold" style={{ fontFamily: "Montserrat" }}> Witness</h3>
                <p className="text-gray-300 text-sm">**************</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-400 tabular-nums">
              Indian Army Legacy
            </div>
          </div>

          {/* Growth Rate */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold" style={{ fontFamily: "Montserrat" }}>Monthly Growth</h3>
                <p className="text-gray-300 text-sm">Increasing interest</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-400 tabular-nums">
              +15%
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-300 text-lg mb-8" style={{ fontFamily: "Montserrat" }}>
            Join thousands of heritage enthusiasts exploring India's military legacy
          </p>
          <button className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white rounded-full text-lg font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300 px-10 py-4 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3 mx-auto border-2 border-white/20">
            <Users className="w-5 h-5" />
            Be Part of History
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveCounter;