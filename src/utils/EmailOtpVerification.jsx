import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import heroImage from '../assets/images/heroImage.jpg'
import axios from 'axios'

const EmailOtpVerification = () => {
  const BASE_URL = import.meta.env.VITE_SERVEROTP
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpEnabled, setIsOtpEnabled] = useState(false)
  const navigate = useNavigate()
  const emailRef = useRef(null) // persistent email storage

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // Handle email change
  const handleEmailChange = (e) => setEmail(e.target.value)

  // Send OTP
  const handleSendOtp = async () => {
    if (!email.trim()) {
      toast.error("Email is required")
      return
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email format")
      return
    }

    try {
      setIsLoading(true)
      const res = await axios.post(`https://royanheritage.onrender.com/api/v1/verify/generateOtp`, { email: email.trim() })
      
      if (res.status === 201) {
        toast.success("OTP sent to your email")
        emailRef.current = email.trim() // store persistent email
        console.log(res);
        
        setIsOtpEnabled(true) // enable OTP input
      } else {
        toast.error("Failed to send OTP. Try again.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Error sending OTP")
    } finally {
      setIsLoading(false)
    }
  }

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP")
      return
    }
    try {
      const res = await axios.post(`https://royanheritage.onrender.com/api/v1/verify/verifyOtp`, { 
        email: emailRef.current, 
        otp: otp.trim() 
      })
      console.log(res);

      if (res.status === 201) {
        toast.success("OTP verified")
        
        navigate("/EnterEmail/BookingForm")
      } else {
        toast.error("Invalid OTP")
      }
    } catch (err) {
      console.error(err)
      toast.error("Invalid OTP")
    }
  }

  return (
    <div className="bgImageforVerificationOfEmailId relative w-full min-h-screen pt-[80px] sm:pt-[100px]">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      <div className="relative z-20 flex justify-center items-start px-4 py-8 min-h-[calc(100vh-160px)]">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl text-white p-4 sm:p-6 lg:p-7 mt-4 sm:mt-8 lg:mt-12">
          <a href="#" className='flex flex-row items-center justify-center'>
            <img
              className="rounded-xl shadow-md mb-4 sm:mb-5 w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover"
              src={heroImage}
              alt="Verification Banner"
            />
          </a>

          <h2 className="text-xl sm:text-2xl font-semibold mb-1 text-center">Verify Your Email</h2>
          <p className="text-xs sm:text-sm text-gray-300 mb-4 text-center px-2">
            Enter your email and OTP to continue.
          </p>

          {/* Email input */}
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            disabled={isOtpEnabled || isLoading}
            className="w-full h-[40px] px-3 mb-3 text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 opacity-80 disabled:opacity-50"
          />

          <button
            onClick={handleSendOtp}
            disabled={isOtpEnabled || isLoading || !email || !isValidEmail(email)}
            className="w-full py-2 bg-gradient-to-r from-orange-600 to-green-500 hover:from-orange-400 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm mb-4 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>

          {/* OTP input */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!isOtpEnabled}
            className="w-full h-[40px] px-3 mb-3 text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 opacity-80 disabled:opacity-50"
          />

          <button
            onClick={handleVerifyOtp}
            disabled={!isOtpEnabled || !otp}
            className="w-full py-2 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-400 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify OTP
          </button>

          <p className="text-xs mt-3 text-center text-gray-300">
            We'll never share your email with anyone else.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailOtpVerification
