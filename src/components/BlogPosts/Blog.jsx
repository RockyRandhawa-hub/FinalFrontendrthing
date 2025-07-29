import React from 'react';
import Header from '../../utils/Header';
import Navdeep from "../../assets/images/Navdeep.jpg";
import WarMemorial from "../../assets/images/WarMemorial.jpg";
import GunPark from "../../assets/images/GunPark.jpg";
import Missiles from "../../assets/images/Missiles.jpg";

import Footer from '../../utils/Footer';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Sample blog data - you can move this to props or API later
  const blogPosts = [
    {
      id: 1,
      image: Navdeep,
      readTime: "8 min read",
      title: "Plan Your Journey Through Military's Heritage: Timings and What to Expect"
      
    },
    {
      id: 2,
      image: WarMemorial,
      readTime: "6 min read", 
      title: "Exploring the Historic Battlefields: A Comprehensive Guide"
    },
    {
      id: 3,
      image: GunPark,
      readTime: "10 min read",
      title: "Military Museums: Preserving Our Nation's Legacy"
    },
    {
      id: 4,
      image: Missiles,
      readTime: "5 min read",
      title: "Stories of Valor: Heroic Tales from India's Military History"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${Navdeep})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blue-950 to-black/80" />
          
        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h1 
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{fontFamily: "Kaushan"}}
            >
              Read the Stories Behind<br />
              <span className="text-amber-400">India's Historic Army Sites</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mt-6">
              Discover the valor, sacrifice, and heritage that shaped our nation
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Blog Posts Section - ENHANCED BACKGROUND */}
      <div className="min-h-screen relative overflow-hidden py-16">
        
        {/* OPTION 1: Subtle Pattern + Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50/30 to-blue-50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-amber-300/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-slate-200/25 rounded-full blur-3xl"></div>
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{fontFamily: "Montserrat"}}
            >
              Latest Stories
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore fascinating tales of courage, history, and heritage from India's military past
            </p>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-white/50"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">

                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500 "
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Read time badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 
                    className="text-xl lg:text-2xl font-semibold text-gray-800 leading-tight mb-4 group-hover:text-amber-600 transition-colors duration-300"
                    style={{fontFamily: "Montserrat"}}
                  >
                    {post.title}
                  </h3>
                  
                  {/* Read more button */}
                  {/* <button className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors duration-200">
                    Read More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-8">Get the latest military heritage stories delivered to your inbox</p>
          <div className="flex flex-row items-center justify-center sm:flex-row gap-4 max-w-md mx-auto">
            <Link to="/EnterEmail">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Choose Your Slot
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;