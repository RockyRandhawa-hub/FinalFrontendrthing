import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      id: 1,
      title: "Phone Support",
      content: "+91 6266 978 544",
      description: "Available 24/7 for heritage walk bookings",
      icon: "📞",
      color: "orange"
    },
    {
      id: 2,
      title: "Heritage Walk Location",
      content: "MCMM Jabalpur",
      description: "Military College & War Memorial Experience",
      icon: "🏛️",
      color: "gray"
    },
    {
      id: 3,
      title: "Email Support",
      content: "heritage@mcmmjabalpur.in",
      description: "For detailed inquiries and group bookings",
      icon: "✉️",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen p-5" style={{
      background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 33%, #FFFFFF 66%, #138808 100%)'
    }}>
      <div className="max-w-6xl mx-auto bg-white bg-opacity-95 rounded-2xl p-10 shadow-2xl backdrop-blur-sm border border-white border-opacity-30">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 font-light mb-2">
            MCMM Jabalpur Heritage Walk Booking
          </p>
          <p className="text-lg text-gray-500">
            Experience the War Memorial alongside the Military College
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div 
                  key={info.id}
                  className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    borderLeft: `5px solid ${
                      info.color === 'orange' ? '#FF9933' : 
                      info.color === 'gray' ? '#95a5a6' : '#138808'
                    }`,
                    borderRadius: '10px',
                    padding: '25px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex items-start">
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-full text-white text-xl mr-4 flex-shrink-0"
                      style={{
                        background: info.color === 'orange' 
                          ? 'linear-gradient(135deg, #FF9933, #ff7f00)' 
                          : info.color === 'gray'
                          ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
                          : 'linear-gradient(135deg, #138808, #0d6e06)',
                        boxShadow: `0 4px 10px ${
                          info.color === 'orange' ? 'rgba(255, 153, 51, 0.3)' :
                          info.color === 'gray' ? 'rgba(149, 165, 166, 0.3)' : 
                          'rgba(19, 136, 8, 0.3)'
                        }`
                      }}
                    >
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        {info.id === 1 ? (
                          <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-lg">
                            {info.content}
                          </span>
                        ) : (
                          info.content
                        )}
                      </p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Heritage Walk Info */}
            <div className="mt-8 p-6 rounded-xl" style={{
              background: 'linear-gradient(135deg, #FF9933 10%, #FFFFFF 50%, #138808 90%)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}>
              <h3 className="text-xl font-bold text-white mb-4 text-center">🏛️ Heritage Walk Experience</h3>
              <div className="bg-white bg-opacity-95 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    War Memorial Historical Tour
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                    Military College Campus Experience
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    Guided Heritage Walks Available
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-300"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message / Booking Inquiry *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-300 resize-vertical"
                  placeholder="Tell us about your heritage walk booking requirements, group size, preferred dates, or any questions..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 px-6 rounded-lg font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #FF9933, #ff7f00)',
                  boxShadow: '0 4px 15px rgba(255, 153, 51, 0.4)'
                }}
              >
                Send Message & Book Heritage Walk
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-gray-600">
            <strong>MCMM Jabalpur Heritage Walk</strong> - Preserving Military History & Heritage
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Book your guided tour to experience the rich military heritage of Jabalpur
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;