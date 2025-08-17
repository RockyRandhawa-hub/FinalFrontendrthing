import React, { useEffect, useState } from 'react';
import { Train, User, MapPin, Calendar, Clock, Plus, Minus, ArrowRight, ArrowLeft, Flag, ShipWheel, CheckCircle } from 'lucide-react';

function BookingForm() {
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const location = window.location;

  const [step, setStep] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);
  const [mainPassenger, setMainPassenger] = useState({
    name: '',
    age: '',
    isArmy: 'false',
    date: '',
    slot: 'TUESDAY_EVENING',
    phone: '',
    email: ''
  });
  const [coPassengers, setCoPassengers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [dateError, setDateError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [preparingPayment, setPreparingPayment] = useState(false);

// Replace your existing useEffect with ONLY this one:
useEffect(() => {
  const detectPaymentReturn = async () => {
    const paymentStatus = searchParams.get('payment');
    const orderId = searchParams.get('order_id');
    
    console.log('🔍 Checking URL params:', { paymentStatus, orderId, currentStep: step });
    
    if (paymentStatus === 'success' && orderId) {
      console.log('🔄 User returned from payment, verifying order:', orderId);
      setProcessing(true);
      
      try {
        const verifyRes = await fetch('http://localhost:8080/api/v1/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            orderId: orderId
          })
        });

        if (verifyRes.status === 200) {
          const responseData = await verifyRes.json();
          console.log('✅ Full verification response:', responseData);
          
          // Extract visitor data properly
          const visitorData = responseData.data.visitor;
          const ticketData = visitorData.tickets[0]; // Get first ticket
          const personsData = ticketData.persons; // Array of all persons
          
          console.log('🔍 Extracted data:', {
            visitorData,
            ticketData, 
            personsData
          });
          
          // Set main passenger from first person
          if (personsData && personsData.length > 0) {
            const firstPerson = personsData[0];
            
            setMainPassenger({
              name: firstPerson.name || '',
              age: firstPerson.age?.toString() || '',
              isArmy: firstPerson.army ? 'true' : 'false',
              date: ticketData.date ? new Date(ticketData.date).toISOString().split('T')[0] : '',
              slot: ticketData.slot || 'TUESDAY_EVENING',
              phone: visitorData.mobile || '',
              email: visitorData.email || '' // You might need to add this to backend
            });
            
            // Set co-passengers from remaining persons
            const coPassengerData = personsData.slice(1).map(person => ({
              name: person.name || '',
              age: person.age?.toString() || '',
              isArmy: person.army ? 'true' : 'false'
            }));
            
            setCoPassengers(coPassengerData);
            setTicketCount(personsData.length);
            
            console.log('✅ Set passenger data:', {
              mainPassenger: firstPerson.name,
              coPassengerCount: coPassengerData.length,
              totalCount: personsData.length
            });
          }
          
          // Set payment data for reference
          setPaymentData(responseData.data);
          setTickets(personsData || []);
          setStep(3);
          setProcessing(false);
          
          // Clean up URL
          const newUrl = location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          
        } else {
          const errorData = await verifyRes.json().catch(() => ({ message: 'Unknown error' }));
          setProcessing(false);
          setStep(2);
          console.error('❌ Verification failed:', errorData);
          alert('Payment verification failed. Please contact support with order ID: ' + orderId);
        }
        
      } catch (error) {
        setProcessing(false);
        setStep(1);
        console.error('❌ Payment verification error:', error);
        alert('Payment verification failed. Please try again or contact support.');
      }
    }
  };

  detectPaymentReturn();
}, [searchParams]); // Keep your existing URL change listener useEffect as-is

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isValidDay = (dateString) => {
    if (!dateString) return true;
    const selectedDate = new Date(dateString + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();
    return [0, 2, 6].includes(dayOfWeek);
  };

  const handleMainPassengerChange = (field, value) => {
    if (field === 'date') {
      if (value && !isValidDay(value)) {
        const selectedDate = new Date(value + 'T00:00:00');
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()];
        setDateError(`Please select a Tuesday, Saturday, or Sunday only. You selected ${dayName}.`);
        return;
      } else {
        setDateError('');
      }
    }
    setMainPassenger(prev => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCoPassengerChange = (index, field, value) => {
    const updated = [...coPassengers];
    updated[index] = { ...updated[index], [field]: value };
    setCoPassengers(updated);
  };

  const addCoPassenger = () => {
    if (coPassengers.length < ticketCount - 1) {
      setCoPassengers([...coPassengers, { name: '', age: '', isArmy: 'false' }]);
    }
  };

  const removeCoPassenger = (index) => {
    setCoPassengers(coPassengers.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (step === 1 && mainPassenger.name && mainPassenger.age && mainPassenger.date && mainPassenger.phone && mainPassenger.email) {
      const initialCoPassengers = Array(ticketCount - 1).fill(null).map(() => ({
        name: '',
        age: '',
        isArmy: 'false'
      }));
      setCoPassengers(initialCoPassengers);
      setStep(2);
    }
  };

  const loadJsPDF = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const loadCashfreeScript = () => {
    return new Promise((resolve) => {
      if (window.Cashfree) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 const downloadTicket = async () => {
  try {
    console.log('🔄 Starting PDF generation with data:', {
      mainPassenger,
      coPassengers,
      ticketCount,
      paymentData
    });

    const scriptLoaded = await loadJsPDF();
    if (!scriptLoaded) {
      alert('Failed to load PDF generator. Please try again.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text('Heritage Walk Express', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Train Booking Confirmation', 20, 28);

    // Booking Details
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 32, 190, 32);

    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0);
    doc.text('Booking Details:', 20, 40);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // 🔴 FIX 5: ENSURE DATA EXISTS BEFORE USING
    const email = mainPassenger.email || 'Not Available';
    const phone = mainPassenger.phone || 'Not Available';
    const date = mainPassenger.date || 'Not Available';
    const slot = mainPassenger.slot ? mainPassenger.slot.replace('_', ' ') : 'Not Available';
    const totalTickets = ticketCount || 1;

    doc.text(`Email: ${email}`, 20, 48);
    doc.text(`Phone: ${phone}`, 20, 55);
    doc.text(`Date: ${date}`, 20, 62);
    doc.text(`Slot: ${slot}`, 20, 69);
    doc.text(`Total Tickets: ${totalTickets}`, 20, 76);

    // Payment Info if available
    if (paymentData) {
      doc.text(`Order ID: ${paymentData.orderId || 'N/A'}`, 20, 83);
    }

    // Passenger Table Header
    let y = 95;
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0);
    doc.text('Passenger Details:', 20, y);

    y += 10;

    doc.setFillColor(37, 99, 235);
    doc.setTextColor(255, 255, 255);
    doc.rect(20, y, 170, 10, 'F');
    doc.text('S.No', 25, y + 7);
    doc.text('Name', 45, y + 7);
    doc.text('Age', 100, y + 7);
    doc.text('Is Army', 120, y + 7);
    doc.text('Ticket Fee', 160, y + 7);

    // Table Body
    let serial = 1;
    y += 13;

    const addRow = (person) => {
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(serial % 2 === 0 ? 240 : 250, 240, 240);
      doc.rect(20, y - 5, 170, 10, 'F');

      const name = person.name || 'Not Available';
      const age = person.age || '0';
      const isArmy = person.isArmy === 'true' || person.isArmy === true;
      const fee = calculateTicketPrice(age, isArmy);

      doc.text(`${serial}`, 25, y + 2);
      doc.text(name.substring(0, 20), 45, y + 2); // Limit name length
      doc.text(`${age}`, 100, y + 2);
      doc.text(isArmy ? 'Yes' : 'No', 120, y + 2);
      doc.text(`₹${fee}`, 160, y + 2);

      y += 12;
      serial++;
    };

    // Add main passenger
    console.log('📝 Adding main passenger to PDF:', mainPassenger);
    if (mainPassenger.name) {
      addRow(mainPassenger);
    }

    // Add co-passengers
    console.log('📝 Adding co-passengers to PDF:', coPassengers);
    if (coPassengers && coPassengers.length > 0) {
      coPassengers.forEach(passenger => {
        if (passenger.name) { // Only add if name exists
          addRow(passenger);
        }
      });
    }

    // Total Amount
    y += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 10;

    const fareDetails = calculateTotalFare();
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text(`Total Amount: ₹${fareDetails.total}`, 20, y);

    // Footer
    y += 25;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for booking with Heritage Walk Express!', 20, y);
    doc.text('For support, contact: support@heritageexpress.com', 20, y + 8);

    // Payment confirmation stamp
    if (paymentData) {
      y += 20;
      const circleX = 40;
      const circleY = y + 10;
      const radius = 12;

      doc.setDrawColor(0, 128, 0);
      doc.setFillColor(0, 200, 0);
      doc.circle(circleX, circleY, radius, 'FD');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      doc.text('VERIFIED', circleX, circleY - 1.5, { align: 'center' });
      doc.text('BY MCMM', circleX, circleY + 3.5, { align: 'center' });
      doc.text('PAID', circleX, circleY - 1.5, { align: 'center' });
      doc.text('CONFIRMED', circleX, circleY + 3.5, { align: 'center' });
    }

    // Generate filename with fallback
    const passengerName = mainPassenger.name || 'Unknown';
    const fileName = `Heritage_Walk_Ticket_${passengerName.replace(/\s+/g, '_')}.pdf`;
    
    console.log('✅ PDF generation completed, downloading as:', fileName);
    doc.save(fileName);

  } catch (err) {
    console.error('❌ PDF generation failed:', err);
    alert('Failed to generate PDF. Error: ' + err.message);
  }
};


  const handleClickverificationforTIcketOrder = async () => {
    setPreparingPayment(true);

    try {
      console.log('🔄 Loading Cashfree SDK...');
      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded) {
        setPreparingPayment(false);
        alert('Failed to load payment gateway. Please refresh the page and try again.');
        return;
      }

      const ticketsArray = [];

      ticketsArray.push({
        name: mainPassenger.name,
        age: mainPassenger.age,
        army: mainPassenger.isArmy === 'true',
        date: mainPassenger.date,
        slot: mainPassenger.slot,
        phone: mainPassenger.phone,
        email: mainPassenger.email,
        passengerType: 'primary'
      });

      coPassengers.forEach((coPassenger, index) => {
        ticketsArray.push({
          name: coPassenger.name,
          age: coPassenger.age,
          army: coPassenger.isArmy === 'true',
          date: mainPassenger.date,
          slot: mainPassenger.slot,
          phone: mainPassenger.phone,
          email: mainPassenger.email,
          passengerType: 'co-passenger',
          passengerNumber: index + 2
        });
      });

      setTickets(ticketsArray);

      const res = await fetch('http://localhost:8080/api/v1/payment/createorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tickets: ticketsArray
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const orderData = await res.json();
      console.log('Order created:', orderData);

      const { orderId, payment_session_id } = orderData.data;

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!window.Cashfree) {
        setPreparingPayment(false);
        alert('Payment gateway not loaded properly. Please refresh the page and try again.');
        return;
      }

      setPreparingPayment(false);

      try {
        const cashfree = Cashfree({
          mode: "production"
        });

        const checkoutOptions = {
          paymentSessionId: payment_session_id,
          returnUrl: `${window.location.origin}${window.location.pathname}?payment=success&order_id=${orderId}`
        };

        console.log('Checkout options:', checkoutOptions);
        cashfree.checkout(checkoutOptions);

      } catch (sdkError) {
        console.error('❌ Cashfree SDK Error:', sdkError);
        alert('Failed to initialize payment gateway. Please try again.');
        setPreparingPayment(false);
      }
      
    } catch (error) {
      setPreparingPayment(false);
      console.error('Order creation error:', error);
      alert('Failed to create order. Please try again or contact support.');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateTicketPrice = (age, isArmy = false) => {
    if (isArmy) return 100;

    const ageNum = parseInt(age);
    if (ageNum >= 60) return 100;
    if (ageNum >= 5 && ageNum <= 18) return 100;
    if (ageNum > 18) return 200;
    if (ageNum < 5) return 0;
    return 100;
  };

  const calculateTotalFare = () => {
    let totalBaseFare = 0;

    if (mainPassenger.age) {
      totalBaseFare += calculateTicketPrice(mainPassenger.age, mainPassenger.isArmy === 'true');
    }

    coPassengers.forEach(passenger => {
      if (passenger.age) {
        totalBaseFare += calculateTicketPrice(passenger.age, passenger.isArmy === 'true');
      }
    });

    return { total: totalBaseFare };
  };

  const isStep1Valid = mainPassenger.name && mainPassenger.age && mainPassenger.date && mainPassenger.phone && mainPassenger.email && !dateError;
  const isStep2Valid = coPassengers.every(p => p.name && p.age);

  const fareDetails = calculateTotalFare();

  // Show loader for post-payment processing
  if (processing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold text-blue-900">Verifying your payment...</p>
          <p className="text-blue-700 text-sm mt-2">Please wait, don't close or go back</p>
        </div>
      </div>
    );
  }

  // Show loader for pre-payment preparation
  if (preparingPayment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold text-blue-900">Preparing payment gateway...</p>
          <p className="text-blue-700 text-sm mt-2">Setting up your booking, please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShipWheel className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Heritage Walk Express</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`flex-1 h-2 rounded-full ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              </div>
            </div>

            {/* Step 1: Main Passenger Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Primary Passenger Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={mainPassenger.name}
                      onChange={(e) => handleMainPassengerChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={mainPassenger.age}
                      onChange={(e) => handleMainPassengerChange('age', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Age"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Are you from Army?</label>
                  <select
                    value={mainPassenger.isArmy}
                    onChange={(e) => handleMainPassengerChange('isArmy', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Date <span className="text-blue-600">(Only Tuesday, Saturday, Sunday allowed)</span>
                  </label>
                  <input
                    type="date"
                    value={mainPassenger.date}
                    onChange={(e) => handleMainPassengerChange('date', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                      dateError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-1">{dateError}</p>
                  )}
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Tuesday</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Saturday</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Sunday</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                  <select
                    value={mainPassenger.slot}
                    onChange={(e) => handleMainPassengerChange('slot', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="TUESDAY_EVENING">TUESDAY_EVENING</option>
                    <option value="SATURDAY_EVENING">SATURDAY_EVENING</option>
                    <option value="SUNDAY_MORNING">SUNDAY_MORNING</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={mainPassenger.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value) && value.length <= 10) {
                          handleMainPassengerChange('phone', value);
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        mainPassenger.phone && mainPassenger.phone.length !== 10
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="10-digit mobile number"
                    />
                    {mainPassenger.phone && mainPassenger.phone.length !== 10 && (
                      <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required={true}
                      value={mainPassenger.email}
                      onChange={(e) => handleMainPassengerChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                        mainPassenger.email && !isValidEmail(mainPassenger.email)
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="Enter email address"
                    />
                    {mainPassenger.email && !isValidEmail(mainPassenger.email) && (
                      <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Tickets</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold px-4">{ticketCount}</span>
                    <button
                      onClick={() => setTicketCount(Math.min(9, ticketCount + 1))}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Maximum 9 tickets per booking</p>
                </div>
              </div>
            )}

            {/* Step 2: Co-passengers */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Co-Passenger Details</h2>
                </div>

                {ticketCount === 1 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">No co-passengers required for single ticket booking.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {coPassengers.map((passenger, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-800">Passenger {index + 2}</h3>
                          {coPassengers.length > 1 && (
                            <button
                              onClick={() => removeCoPassenger(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                              type="text"
                              value={passenger.name}
                              onChange={(e) => handleCoPassengerChange(index, 'name', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Enter full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                            <input
                              type="number"
                              value={passenger.age}
                              onChange={(e) => handleCoPassengerChange(index, 'age', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Age"
                              min="1"
                              max="120"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Are you from Army?</label>
                          <select
                            value={passenger.isArmy}
                            onChange={(e) => handleCoPassengerChange(index, 'isArmy', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <CheckCircle className="w-6 h-6 text-green-600" />
      <h2 className="text-2xl font-semibold text-gray-800">Booking Confirmation</h2>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-800">Payment Successful!</h3>
          <p className="text-green-600">Your tickets have been booked successfully.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-green-700">
              <strong>Primary Person:</strong> {mainPassenger.name || 'Loading...'}
            </p>
            <p className="text-sm text-green-700 mt-1">
              <strong>Email:</strong> {mainPassenger.email || 'Not Available'}
            </p>
            <p className="text-sm text-green-700 mt-1">
              <strong>Phone:</strong> {mainPassenger.phone || 'Not Available'}
            </p>
          </div>
          <div>
            <p className="text-sm text-green-700">
              <strong>Total Visitors:</strong> {ticketCount}
            </p>
            <p className="text-sm text-green-700 mt-1">
              <strong>Travel Date:</strong> {mainPassenger.date || 'Not Available'}
            </p>
            <p className="text-sm text-green-700 mt-1">
              <strong>Time Slot:</strong> {mainPassenger.slot ? mainPassenger.slot.replace('_', ' ') : 'Not Available'}
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-sm text-green-700">
            <strong>Total Amount Paid:</strong> 
            <span className="text-lg font-bold text-green-800 ml-2">₹{fareDetails.total}</span>
          </p>
          {paymentData && (
            <p className="text-xs text-green-600 mt-1">
              Order ID: {paymentData.orderId || paymentData.order_id || 'Not Available'}
            </p>
          )}
        </div>
      </div>

     
      {/* Download Button */}
      <div className="mt-6 text-center">
        <button
          onClick={downloadTicket}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg inline-flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Ticket PDF
        </button>
        <p className="text-sm text-green-600 mt-2">
          Your ticket confirmation is ready
        </p>
      </div>
    </div>
  </div>
)}

            {/* Navigation Buttons */}
            <div className={`flex mt-8 ${step === 3 ? 'justify-center' : 'justify-between'}`}>
              {step !== 3 && (
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    step === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              )}

              {step === 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    !isStep1Valid
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : step === 2 ? (
                <button
                  onClick={handleClickverificationforTIcketOrder}
                  disabled={!isStep2Valid || preparingPayment}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    !isStep2Valid || preparingPayment
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {preparingPayment ? (
                    <>
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Preparing...
                    </>
                  ) : (
                    <>
                      Book Tickets
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : step === 3 ? (
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Book Another Ticket
                </button>
              ) : null}
            </div>
          </div>

          {/* Right Side - Ticket Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Ticket Preview</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Flag className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">MCMM</h3>
                    <p className="text-blue-200 text-sm">Heritage Express No: 482020</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-sm">Date</p>
                  <p className="font-semibold">{mainPassenger.date || new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">JBP</span>
                  </div>
                  <p className="text-blue-200 text-sm">...</p>
                </div>
                <div className="flex-1 px-4">
                  <div className="border-t-2 border-dashed border-blue-200 relative">
                    <Clock className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600" />
                  </div>
                  <p className="text-center text-blue-200 text-sm mt-1">2H 30M</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">MCMM</span>
                  </div>
                  <p className="text-blue-200 text-sm">...</p>
                </div>
              </div>
            </div>

            {/* Passenger List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Total Occupancy</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {ticketCount} Ticket{ticketCount > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3">
                {/* Main Passenger */}
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {mainPassenger.name || 'Primary Passenger'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {mainPassenger.age && `Age: ${mainPassenger.age}`}
                        {mainPassenger.isArmy === 'true' && ' • Army Personnel'}
                      </p>
                      {mainPassenger.age && (
                        <p className="text-xs text-blue-600 font-medium">
                          Fare: ₹{calculateTicketPrice(mainPassenger.age, mainPassenger.isArmy === 'true')}
                        </p>
                      )}
                    </div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      PRIMARY
                    </span>
                  </div>
                </div>

                {/* Co-passengers */}
                {coPassengers.map((passenger, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {passenger.name || `Passenger ${index + 2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {passenger.age && `Age: ${passenger.age}`}
                          {passenger.isArmy === 'true' && ' • Army Personnel'}
                        </p>
                        {passenger.age && (
                          <p className="text-xs text-blue-600 font-medium">
                            Fare: ₹{calculateTicketPrice(passenger.age, passenger.isArmy === 'true')}
                          </p>
                        )}
                      </div>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        CO-PASSENGER
                      </span>
                    </div>
                  </div>
                ))}

                {/* Placeholder for remaining passengers */}
                {Array(Math.max(0, ticketCount - 1 - coPassengers.length)).fill(null).map((_, index) => (
                  <div key={`placeholder-${index}`} className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">Passenger {coPassengers.length + index + 2}</p>
                        <p className="text-sm text-gray-400">Details pending</p>
                      </div>
                      <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded text-xs">
                        PENDING
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fare Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare ({ticketCount} ticket{ticketCount > 1 ? 's' : ''})</span>
                </div>

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{fareDetails.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Pricing Rules:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Army Personnel: ₹100</li>
                  <li>• Age 5-18: ₹100</li>
                  <li>• Age 60+: ₹100</li>
                  <li>• Age 19-59: ₹200</li>
                  <li>• Age under 5: Free</li>
                </ul>
              </div>

              {/* Success message for step 3 */}
              {step === 3 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-800 font-medium">Payment Confirmed!</p>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your booking is confirmed and tickets are ready for download.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
