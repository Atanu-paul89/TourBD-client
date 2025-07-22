
import React from 'react';

const Overview = () => {
  return (
    <section className="py-16 bg-[#FFE3E1] text-center px-4"> 
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF9494] mb-8">
          Welcome to TourBD: Your Gateway to Bangladesh
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
          The Tourist Guide site is your comprehensive online platform dedicated to helping you explore the breathtaking beauty and rich culture of Bangladesh. From famous landmarks to hidden gems, we provide detailed information to ensure your trip is unforgettable. Discover local traditions, savor authentic cuisine, and embark on adventures tailored just for you.
        </p>

        <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-lg shadow-xl overflow-hidden">

          <iframe
            src="https://www.youtube.com/embed/QNUSIOMb6vI?si=zJiqwlTOfxFYvIlI" 
            title="TourBD Overview Video"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Overview;