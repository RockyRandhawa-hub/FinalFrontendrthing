import React from 'react';

const CancellationRefundPage = () => {
  const policyItems = [
    {
      id: 1,
      text: "If the payment is failed and the amount is not debited you can try again",
      color: "orange"
    },
    {
      id: 2,
      text: "If the payment is failed and the amount is debited in that case contact your UPI provider and bank",
      color: "gray"
    },
    {
      id: 3,
      text: "In case the amount is debited and the bank staff is not helping contact us at +91 6266 978 544 with your registered email address",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen p-5" style={{
      background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 33%, #FFFFFF 66%, #138808 100%)'
    }}>
      <div className="max-w-4xl mx-auto bg-white bg-opacity-95 rounded-2xl p-10 shadow-2xl backdrop-blur-sm border border-white border-opacity-30">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Cancellation and Refund
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Payment Policy Guidelines
          </p>
        </div>

        <div className="space-y-6">
          {policyItems.map((item) => (
            <div 
              key={item.id}
              className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderLeft: `5px solid ${
                  item.color === 'orange' ? '#FF9933' : 
                  item.color === 'gray' ? '#95a5a6' : '#138808'
                }`,
                borderRadius: '10px',
                padding: '25px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-start">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg mr-4 flex-shrink-0"
                  style={{
                    background: item.color === 'orange' 
                      ? 'linear-gradient(135deg, #FF9933, #ff7f00)' 
                      : item.color === 'gray'
                      ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
                      : 'linear-gradient(135deg, #138808, #0d6e06)',
                    boxShadow: `0 4px 10px ${
                      item.color === 'orange' ? 'rgba(255, 153, 51, 0.3)' :
                      item.color === 'gray' ? 'rgba(149, 165, 166, 0.3)' : 
                      'rgba(19, 136, 8, 0.3)'
                    }`
                  }}
                >
                  {item.id}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-lg font-medium leading-relaxed">
                    {item.id === 3 ? (
                      <>
                        In case the amount is debited and the bank staff is not helping contact us at{' '}
                        <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 py-1 rounded font-bold">
                          +91 6266 978 544
                        </span>{' '}
                        with your registered email address
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            For any additional queries, please reach out to our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPage;