import React from 'react';

const PrivacyPolicyPage = () => {
  const privacySections = [
    {
      id: 1,
      title: "Information We Collect",
      content: "We collect personal information necessary for heritage walk bookings including name, email, phone number, and identification details as required by Indian Army security protocols for Military College premises access.",
      icon: "🛡️",
      color: "orange"
    },
    {
      id: 2,
      title: "Security Clearance & Verification",
      content: "All visitor information is subject to Indian Army security verification procedures. Personal data may be shared with military authorities for background verification and premises security as mandated by defense regulations.",
      icon: "🔒",
      color: "gray"
    },
    {
      id: 3,
      title: "Data Protection & Storage",
      content: "Your personal information is stored securely in compliance with Indian Army data protection standards and Government of India privacy guidelines. Data is retained only as long as necessary for security and booking purposes.",
      icon: "🛡️",
      color: "green"
    },
    {
      id: 4,
      title: "Photography & Documentation",
      content: "Photographs and videos may be taken during heritage walks for promotional and security purposes. By booking, you consent to such documentation in accordance with Indian Army media policies.",
      icon: "📸",
      color: "orange"
    },
    {
      id: 5,
      title: "Third-Party Sharing",
      content: "Information may be shared with Indian Army units, Ministry of Defence, and authorized security agencies as required by national security protocols. No commercial third-party sharing occurs without explicit consent.",
      icon: "🏛️",
      color: "gray"
    },
    {
      id: 6,
      title: "Your Rights & Contact",
      content: "You have the right to access, modify, or request deletion of your personal information, subject to security clearance requirements. Contact us at +91 6266 978 544 for privacy-related queries.",
      icon: "📞",
      color: "green"
    }
  ];

  const securityNotices = [
    {
      title: "Defense Security Notice",
      content: "This site operates under Indian Army security protocols. All bookings are subject to military clearance.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800"
    },
    {
      title: "Government Compliance",
      content: "We comply with all applicable Indian laws including IT Act 2000, Personal Data Protection Bill, and defense regulations.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200", 
      textColor: "text-blue-800"
    }
  ];

  return (
    <div className="min-h-screen p-5" style={{
      background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 33%, #FFFFFF 66%, #138808 100%)'
    }}>
      <div className="max-w-5xl mx-auto bg-white bg-opacity-95 rounded-2xl p-10 shadow-2xl backdrop-blur-sm border border-white border-opacity-30">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 font-light mb-2">
            MCMM Jabalpur Heritage Walk Booking
          </p>
          <p className="text-lg text-gray-500">
            Indian Army Associated Military Heritage Site
          </p>
        </div>

        {/* Security Notices */}
        <div className="mb-8 space-y-4">
          {securityNotices.map((notice, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${notice.bgColor} ${notice.borderColor}`}
            >
              <h3 className={`font-bold text-lg ${notice.textColor} mb-2`}>
                ⚠️ {notice.title}
              </h3>
              <p className={`${notice.textColor}`}>
                {notice.content}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Privacy & Security Guidelines</h2>
          
          {privacySections.map((section) => (
            <div 
              key={section.id}
              className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderLeft: `5px solid ${
                  section.color === 'orange' ? '#FF9933' : 
                  section.color === 'gray' ? '#95a5a6' : '#138808'
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
                    background: section.color === 'orange' 
                      ? 'linear-gradient(135deg, #FF9933, #ff7f00)' 
                      : section.color === 'gray'
                      ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
                      : 'linear-gradient(135deg, #138808, #0d6e06)',
                    boxShadow: `0 4px 10px ${
                      section.color === 'orange' ? 'rgba(255, 153, 51, 0.3)' :
                      section.color === 'gray' ? 'rgba(149, 165, 166, 0.3)' : 
                      'rgba(19, 136, 8, 0.3)'
                    }`
                  }}
                >
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.id === 6 ? (
                      <>
                        You have the right to access, modify, or request deletion of your personal information, subject to security clearance requirements. Contact us at{' '}
                        <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 py-1 rounded font-bold">
                          +91 6266 978 544
                        </span>{' '}
                        for privacy-related queries.
                      </>
                    ) : (
                      section.content
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-8 rounded-xl" style={{
          background: 'linear-gradient(135deg, #FF9933 10%, #FFFFFF 50%, #138808 90%)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
        }}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🏛️ Important Security Information</h3>
          <div className="bg-white bg-opacity-95 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  🎖️ Military Clearance Requirements
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Valid government ID mandatory for all visitors
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Security screening required before entry
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                    Photography restrictions apply in certain areas
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  📋 Data Compliance Standards
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                    Indian Army data protection protocols
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                    Government of India IT Act compliance
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                    Ministry of Defence security guidelines
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center p-6 bg-gray-50 rounded-xl">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Privacy Officer Contact</h4>
          <p className="text-gray-600 mb-2">
            For privacy concerns or data protection queries related to your heritage walk booking:
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Phone: <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-lg">
              +91 6266 978 544
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Email: privacy@mcmmjabalpur.in
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-gray-600">
            <strong>MCMM Jabalpur Heritage Walk</strong> - Under Indian Army Administration
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: August 2025 | Subject to Indian Army Security Regulations
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;