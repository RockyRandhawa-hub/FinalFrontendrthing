import React from 'react';

const TermsConditionsPage = () => {
  const termsSection = [
    {
      id: 1,
      title: "Booking and Registration",
      content: "All heritage walk bookings require advance registration with valid government-issued photo identification. Booking confirmation is subject to Indian Army security clearance approval. Visitors must provide accurate personal information for verification purposes.",
      icon: "📋",
      color: "orange"
    },
    {
      id: 2,
      title: "Security Clearance Requirements",
      content: "Entry to MCMM premises is strictly regulated by Indian Army security protocols. All visitors must undergo security screening and background verification. The Indian Army reserves the right to deny entry without providing specific reasons for security purposes.",
      icon: "🛡️",
      color: "gray"
    },
    {
      id: 3,
      title: "Conduct and Behavior",
      content: "Visitors must maintain appropriate conduct befitting a military establishment. Disrespectful behavior, unauthorized photography, or violation of military discipline will result in immediate expulsion and possible legal action under military law.",
      icon: "⚖️",
      color: "green"
    },
    {
      id: 4,
      title: "Photography and Recording",
      content: "Photography and video recording are strictly prohibited in designated security zones. Permitted areas are clearly marked. Any unauthorized recording may be confiscated and legal action may be taken under the Official Secrets Act, 1923.",
      icon: "📸",
      color: "orange"
    },
    {
      id: 5,
      title: "Liability and Insurance",
      content: "The Indian Army and MCMM Jabalpur are not liable for personal injury, loss, or damage during heritage walks. Visitors participate at their own risk. It is recommended to have personal insurance coverage before visiting military premises.",
      icon: "🏥",
      color: "gray"
    },
    {
      id: 6,
      title: "Cancellation and Refund Policy",
      content: "Bookings may be cancelled due to security concerns, military operations, or weather conditions without prior notice. Refunds are processed as per our cancellation policy. For refund queries, contact +91 6266 978 544 immediately.",
      icon: "💰",
      color: "green"
    },
    {
      id: 7,
      title: "Restricted Items and Areas",
      content: "Electronic devices, cameras (in restricted zones), weapons, inflammable materials, and suspicious items are strictly prohibited. Certain areas of the Military College are off-limits to civilians and marked as restricted zones.",
      icon: "🚫",
      color: "orange"
    },
    {
      id: 8,
      title: "Age and Health Restrictions",
      content: "Minors must be accompanied by adults. Visitors with health conditions should inform authorities beforehand. The heritage walk involves walking on military terrain and may not be suitable for individuals with mobility issues.",
      icon: "👥",
      color: "gray"
    },
    {
      id: 9,
      title: "Legal Compliance",
      content: "All activities are governed by Indian military law, state laws, and central government regulations. Violations may result in prosecution under relevant acts including the Official Secrets Act and Indian Penal Code.",
      icon: "🏛️",
      color: "green"
    }
  ];

  const importantNotices = [
    {
      title: "⚠️ Security Alert",
      content: "This is a high-security military establishment. All visitors are subject to thorough security checks and military protocols.",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      textColor: "text-red-800"
    },
    {
      title: "📜 Official Secrets Act",
      content: "Unauthorized disclosure of military information observed during the visit is punishable under the Official Secrets Act, 1923.",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      textColor: "text-yellow-800"
    },
    {
      title: "🎖️ Military Discipline",
      content: "All visitors must respect military customs, traditions, and maintain discipline throughout the heritage walk experience.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
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
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 font-light mb-2">
            MCMM Jabalpur Heritage Walk Booking
          </p>
          <p className="text-lg text-gray-500">
            Indian Army Military College & War Memorial
          </p>
        </div>

        {/* Important Notices */}
        <div className="mb-10 space-y-4">
          {importantNotices.map((notice, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${notice.bgColor} ${notice.borderColor}`}
            >
              <h3 className={`font-bold text-lg ${notice.textColor} mb-2`}>
                {notice.title}
              </h3>
              <p className={`${notice.textColor}`}>
                {notice.content}
              </p>
            </div>
          ))}
        </div>

        {/* Acceptance Notice */}
        <div className="mb-8 p-6 rounded-xl" style={{
          background: 'linear-gradient(135deg, #FF9933 20%, #FFFFFF 50%, #138808 80%)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
        }}>
          <div className="bg-white bg-opacity-95 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🤝 Agreement to Terms
            </h3>
            <p className="text-gray-700">
              By booking a heritage walk at MCMM Jabalpur, you acknowledge that you have read, understood, 
              and agree to comply with all terms, conditions, and military regulations outlined below.
            </p>
          </div>
        </div>

        {/* Terms and Conditions Sections */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions</h2>
          
          {termsSection.map((section) => (
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
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {section.id}. {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.id === 6 ? (
                      <>
                        Bookings may be cancelled due to security concerns, military operations, or weather conditions without prior notice. Refunds are processed as per our cancellation policy. For refund queries, contact{' '}
                        <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 py-1 rounded font-bold">
                          +91 6266 978 544
                        </span>{' '}
                        immediately.
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

        {/* Emergency Contact and Compliance */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
              🚨 Emergency Contact
            </h3>
            <div className="space-y-2">
              <p className="text-red-700">
                <strong>Security Emergency:</strong> Contact Military Police immediately
              </p>
              <p className="text-red-700">
                <strong>Booking Support:</strong> 
                <span className="bg-red-600 text-white px-2 py-1 rounded ml-2 font-bold">
                  +91 6266 978 544
                </span>
              </p>
              <p className="text-red-700">
                <strong>Medical Emergency:</strong> Inform escort officer immediately
              </p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              ⚖️ Legal Compliance
            </h3>
            <ul className="space-y-2 text-green-700 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                Indian Army Act, 1950
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                Official Secrets Act, 1923
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                Indian Penal Code, 1860
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                Cantonment Act, 2006
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>MCMM Jabalpur Heritage Walk</strong> - Operating under Indian Army Regulations
          </p>
          <p className="text-sm text-gray-500 mb-2">
            These terms are effective from August 2025 and subject to military regulations and government policies.
          </p>
          <p className="text-xs text-gray-400">
            By proceeding with booking, you acknowledge acceptance of all terms and military protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;