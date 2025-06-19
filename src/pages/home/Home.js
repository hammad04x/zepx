import React from 'react'
import Navbar from '../navbar/Navbar'
import Banner from './Banner'
import Category from './Category'
import MobileSection from './MobileSection'
import WatchBanner from './WatchBanner'
import Footer from '../footer/Footer'
import FeedBack from './FeedBack'
import FAQSection from './Faq'
import Offer from './Offer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Category/>
      <MobileSection/>
      <WatchBanner/>
      <Offer/>
      <FAQSection/>
      <FeedBack/>
      <Footer/>
    </div>
  )
}

export default Home
