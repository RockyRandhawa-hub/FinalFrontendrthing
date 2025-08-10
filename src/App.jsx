
  import React from 'react'
  import './App.css'
  import Hero from './components/Hero'
  import Footer from './utils/Footer'
  import { Route, Routes } from 'react-router-dom'
  import Header from './utils/Header'
  import Blog from './components/BlogPosts/Blog'
  import BookingOne from './utils/BookineOne.jsx'
  import BookingDetails from './components/Protected/BookingDetails.jsx'
  import { Toaster } from 'react-hot-toast'
  import BookingForm from './components/Protected/BookingForm.jsx'
  import AdminLogin from './components/Admin/AdminLogin.jsx'
  import  AdminPanel from './components/Admin/AdminPanel.jsx'
import {BookNow} from "./components/BookNow.jsx"
import CancellationRefundPage from './utils/CancellationRefundPage.jsx'
import ContactUsPage from './utils/ContactUsPage.jsx'
import PrivacyPolicyPage from './utils/PrivacyPolicyPage.jsx'
import TermsConditionsPage from './utils/TermsConditionsPage.jsx'
  export default function App() {
    return (
      <>
        <Toaster position="top-right" />
        <Header />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/blogs" element={<Blog />} />
           <Route path="/cancellationandrefund" element={<CancellationRefundPage />} />
           <Route path="/contactuspage" element={<ContactUsPage />} />
           <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
           <Route path="/termsandcondition" element={<TermsConditionsPage />} />

          <Route path="/booknow" element={<BookNow />} />
          <Route path="/EnterEmail" element={<BookingOne />}>
            <Route path="BookingDetails" element={<BookingDetails />} >
              <Route path="BookingForm" element={<BookingForm />} />
            </Route>
          </Route>
          
          <Route path="heritage/admin/login/protected" element={<AdminLogin />} />
          <Route path="heritage/admin/login/protected/adminPannel" element={<AdminPanel />} />
          

          {/* aur bhi route yahan aa sakte hain */}
        </Routes>

        <Footer />
      </>
    );
  }



  //   return (
  //   <>
  // {/* <div className='mt-[110px]'></div> */}
  //     <Header  />
  //       <Hero  />

  //       <Footer />
  //   </>
  //   )
  // }

