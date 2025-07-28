import React from 'react';
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



import Stick from '../assets/images/Stick.jpg'

const Hero = () => {
  const arr= [Stick , GunPark ,GunParkThree,combinedguns]
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
        href:"/blogs"
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

          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 italic" style={{ fontFamily: "Kaushan" }}>
                March into Madhya Pradesh!
              </h1>
              <p className="text-lg md:text-2xl mb-8" style={{ fontFamily: "Montserrat" }}>
                Book, explore, and honor India's military heritage — digitally.
              </p>
              <Link to="/EnterEmail">
              <button className="bg-white text-gray-800 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors px-8 py-2 cursor-pointer" >
                Explore Destinations
              </button>
              </Link>
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

            <div className="flex justify-center items-center gap-2 mb-12 text-black" style={{ fontFamily: "Montserrat" }}>
              <div className="h-px w-5 bg-black" />
              <span>Journey through courage and heritage</span>
              <div className="h-px w-5 bg-black" />
            </div>
            
<div className="flex flex-wrap justify-center items-center gap-6">
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
          <HeritageTrails />
        </div>
      </div>
    </>
  );
};

export default Hero;
