
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Banner from '../components/Home/Banner';
import Overview from '../components/Home/Overview';
import TourismGuideTabs from '../components/Home/TourismGuideTabs';
import TouristStoriesSection from '../components/Home/TouristStoriesSection';

const Home = () => {
  return (
    <div className="flex flex-col">
      
      <Banner></Banner>
      <Overview></Overview>
      <TourismGuideTabs></TourismGuideTabs>
      <TouristStoriesSection></TouristStoriesSection>

    </div>
  );
};

export default Home;