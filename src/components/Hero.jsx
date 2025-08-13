import React, { useState } from 'react';
import heroImageL from '../assets/images/heroImageL.jpg';
import AdventureBackGround from '../assets/images/AdventureBackGround.jpg';
import Logo from '../assets/icons/Logo.png';
import HeritageTrails from './HeritageTrails';
import { Link } from 'react-router-dom';
import GunPark from '../assets/images/GunPark.jpg'
import GunParkThree from '../assets/images/GunParkThree.jpg'
import GunArticleFour from '../assets/images/GunArticleFour.jpg'
import combinedguns from '../assets/images/combinedguns.jpg'
import Navdeep from '../assets/images/Navdeep.jpg'
import WarMemorial from '../assets/images/WarMemorial.jpg'
import Missiles from '../assets/images/Missiles.jpg'
import { X, Play } from 'lucide-react';
import Stick from '../assets/images/Stick.jpg'

const Hero = () => {
  // Video modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const arr = [Stick, GunPark, GunParkThree, combinedguns]
  const blogPosts = [
    {
      id: 1,
      image: Navdeep,
      readTime: "8 min read",
      title: "Plan Your Journey Through Military's Heritage: Timings and What to Expect",
      href: "/blogs"
    },
    {
      id: 2,
      image: WarMemorial,
      readTime: "6 min read",
      title: "Exploring the Historic Battlefields: A Comprehensive Guide",
      href: "/blogs"
    },
    {
      id: 3,
      image: GunPark,
      readTime: "10 min read",
      title: "Military Museums: Preserving Our Nation's Legacy",
      href: "/blogs"
    },
    {
      id: 4,
      image: Missiles,
      readTime: "5 min read",
      title: "Stories of Valor: Heroic Tales from India's Military History",
      href: "/blogs"
    }
  ];

  return (
    <>
      {/* WRAPPER: Unifying background for smooth transitions */}
      <div
        className="bg-cover bg-center w-full text-white"
        style={{ backgroundImage: `url(${AdventureBackGround})` }}
      >

        {/* HERO SECTION */}
        <div className="relative w-full min-h-screen">
          <img
            src={heroImageL}
            alt="Temple with sky"
            className="w-full h-full object-cover brightness-50"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-yellow-950 to-red/80   bg-black opacity-70  flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 italic" style={{ fontFamily: "Kaushan" }}>
                Military College Of Material Management
              </h1>
              <p className="text-lg md:text-2xl mb-8 text-amber-400" style={{ fontFamily: "Montserrat" }}>
                Book, explore, and honor India's military heritage — digitally.
              </p>
              
              {/* Modified button to open video modal */}
              <button 
                onClick={openModal}
                className="bg-white text-gray-800 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 px-8 py-2 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5" />
                Explore The Heritage
              </button>
            </div>
          </div>
        </div>

        {/* ATTRACTIONS SECTION */}
        <section className="py-24 -mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-[#016630] text-4xl md:text-6xl italic font-bold mb-6" style={{ fontFamily: "Kaushan" }}>
              Attractions
            </div>

            <div className="flex items-center justify-center gap-2 text-black mb-12" style={{ fontFamily: "Montserrat" }}>
              <div className="h-px w-5 bg-black" />
              <span>Our Community, Our Pride</span>
              <div className="h-px w-5 bg-black" />
            </div>

            {/* Attraction Images */}
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-14">
              {arr.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-[392px] h-[313px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl shadow-red-900/100  transition-shadow duration-300"
                >
                  <img src={img} alt={`Attraction ${idx + 1}`} className="w-full h-full object-cover brightness-90" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT THE TOUR SECTION */}
        <section className="mt-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-[#105E3B] text-4xl md:text-5xl italic font-bold mb-4" style={{ fontFamily: "Kaushan" }}>
              About the Tour
            </h2>

            <div className="w-full sm:flex justify-center items-center gap-2 mb-12 text-black" style={{ fontFamily: "Montserrat" }}>
              <div className="h-px w-5 bg-black" />
              <span>Journey through courage and heritage</span>
              <div className="h-px w-5 bg-black" />
            </div>
            
            <div className=" w-full sm:flex flex-wrap justify-center items-center gap-6">
              {blogPosts.map((item) => (
                <Link to={`${item.href}`} key={item.id}>
                  <div className="relative w-full sm:w-[256px] h-[294px] border border-gray-300 rounded-3xl hover:shadow-2xl transition-all duration-300 shadow-lg hover:shadow-black/50 overflow-hidden bg-white group cursor-pointer">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                      {/* Read Time Badge */}
                      <div className="flex justify-start">
                        <span className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                          {item.readTime}
                        </span>
                      </div>
                      
                      {/* Title at Bottom */}
                      <div className="text-left">
                        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-3">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button className="bg-green-600 text-white rounded-full text-lg font-bold hover:bg-black transition-colors px-8 py-2">
                Learn More About Us
              </button>
            </div>
          </div>
        </section>

        {/* HERITAGE TRAILS SECTION */}
        <div className="-mt-16">
          {/* <HeritageTrails /> */}
        </div>
      </div>

      {/* YouTube Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-md transition-opacity duration-500" onClick={closeModal}>
          <div className="relative w-full max-w-5xl bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden transform animate-scaleIn border-4 border-gradient-to-r from-green-500 to-blue-500">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500"></div>
            <div className="absolute top-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            
            {/* Modal Header */}
            <div className="relative flex justify-between items-center p-8 bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
              }}></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-1 flex items-center gap-3">
                  🎖️ Military Heritage Experience
                </h2>
                <p className="text-green-100 text-sm">Discover the legacy of courage and honor</p>
              </div>
              
              <button
                onClick={closeModal}
                className="relative z-10 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Container with Enhanced Styling */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-gold-400 to-yellow-600" style={{ paddingBottom: '56.25%' }}>
                {/* Glowing Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 rounded-2xl blur opacity-30"></div>
                
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl z-10 shadow-inner"
                  src="https://www.youtube.com/embed/klxixX8Li0c?autoplay=1&rel=0"
                  title="Military Heritage Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-yellow-400 z-20"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-yellow-400 z-20"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-yellow-400 z-20"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-yellow-400 z-20"></div>
              </div>
              
              {/* Side Decorative Elements */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-green-400 to-blue-400 rounded-full"></div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-orange-400 to-red-400 rounded-full"></div>
            </div>

            {/* Enhanced Modal Footer */}
            <div className="p-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>
              
              <div className="relative z-10">
                <p className="text-gray-700 mb-2 text-lg font-medium">🏛️ Ready to explore our military heritage?</p>
                <p className="text-gray-500 text-sm mb-6">Embark on a journey through history, valor, and sacrifice</p>
                
                <Link to="/EnterEmail">
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white px-10 py-4 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl font-bold text-lg flex items-center gap-3 mx-auto border-2 border-white"
                  >
                    <span>🚀</span>
                    Start Your Journey
                    <span>⚡</span>
                  </button>
                </Link>
              </div>
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-green-300 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-300 rounded-tr-lg"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;