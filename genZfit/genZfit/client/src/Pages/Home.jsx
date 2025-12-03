import React from 'react'
import MainBanner from '../Components/MainBanner'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'

const Home = () => {
  return (
    <main className="mt-10" aria-label="Homepage">
      <section aria-label="Main banner">
        <MainBanner />
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-label="Best sellers" className="mt-12">
          <BestSeller />
        </section>
      </div>
      <section aria-label="Why we are the best" className="mt-20">
        <BottomBanner />
      </section>
    </main>
  )
}

export default Home
