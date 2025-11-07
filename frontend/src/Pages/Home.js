import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import './Home.css';
import TrendingProducts from '../Components/TrendingProducts';
import FilterProduct from '../Components/FilterProduct';
import Clients from '../Components/Clients';
import ProductBanner from '../Components/ProductBanner';
import Category from '../Components/Category';
import HomeBanner from '../Components/HomeBanner';
import ServicesProvider from '../Components/ServicesProvider';
import Shopnow from '../Components/Shopnow';

function Home() {
   return (
      <div>
         <Navbar />
         <main>
            <HomeBanner/>
            <Category/>
            <ServicesProvider/>
            <TrendingProducts/>
            <Shopnow/>
            <FilterProduct/>
            <Clients/>
            {/* <ProductBanner/> */}
         </main>
         <Footer />
      </div>
   )
}

export default Home