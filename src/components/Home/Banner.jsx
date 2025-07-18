
import { motion } from 'framer-motion';
import { Link } from 'react-router';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Dummy banner data - REPLACE WITH YOUR ACTUAL IMAGES AND CONTENT
const bannerData = [
  {
    id: 1,
    image: '/src/assets/images/banner-bg.jpg', 
    title: 'Discover Serene Landscapes',
    description: 'Explore the tranquil beauty of Bangladesh\'s natural wonders and hidden gems.',
  },
  {
    id: 2,
    image: '/src/assets/images/banner-bg2.jpg', 
    title: 'Immerse in Rich Culture',
    description: 'Experience the vibrant traditions, warm hospitality, and delicious cuisine of Bangladesh.',
  },
  {
    id: 3,
    image: '/src/assets/images/banner-bg3.jpg', 
    title: 'Adventure Awaits You',
    description: 'Embark on thrilling journeys, from lush tea gardens to the world\'s largest mangrove forest.',
  },
];

const Banner = () => {
  return (
    <section className="relative h-screen overflow-hidden"> {/* Added overflow-hidden for cleaner look */}
      <Swiper
        spaceBetween={0} // No space between slides for a continuous look
        centeredSlides={true}
        autoplay={{
          delay: 1500, // Time in ms between slide transitions (4.5 seconds)
          disableOnInteraction: false, // Keep autoplay even if user interacts
        }}
        pagination={{
          clickable: true, // Dots at the bottom
        }}
        navigation={false} // Navigation arrows (left/right)
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full" // Ensure Swiper takes full height and width
      >
        {bannerData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-50"></div>

              <div className="relative z-10 text-center p-4">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* Button color using direct hex code #FF9494 */}
                  <Link to="/all-trips" className="btn bg-[#FF9494] text-white border-none hover:bg-[#E07B7B] text-lg px-8 py-3 rounded-full shadow-lg">
                    Explore Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;