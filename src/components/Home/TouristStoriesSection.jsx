
import React from 'react';

const TouristStoriesSection = () => {
  const touristStories = [
    {
      id: 1,
      name: 'Emma R.',
      location: 'Canada',
      story: 'TourBD made my trip to Bangladesh unforgettable! The guides were incredibly knowledgeable, and the itinerary was perfectly crafted. I saw so much beauty and experienced true Bangladeshi hospitality. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1560329072-17f59dcd30a4?q=80&w=841&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder user image
    },
    {
      id: 2,
      name: 'David L.',
      location: 'Australia',
      story: 'From the bustling streets of Dhaka to the serene beauty of the Sundarbans, every moment was an adventure. TourBD handled everything seamlessly. I felt safe, informed, and completely immersed in the local culture.',
      image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder user image
    },
    {
      id: 3,
      name: 'Sophie M.',
      location: 'UK',
      story: 'As a solo female traveler, I was initially hesitant, but TourBD provided such a supportive and well-organized experience. The tea gardens of Sylhet were breathtaking. I\'m already planning my next trip with them!',
      image: 'https://plus.unsplash.com/premium_photo-1723867331866-e112500178a4?q=80&w=827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder user image
    },
  ];

  return (
    <section className="py-16 bg-[#FFE3E1] px-4"> {/* Using #FFE3E1 for background */}
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF9494] mb-12"> {/* Using #FF9494 for text */}
          Real Stories from Happy Travelers
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {touristStories.map(story => (
            <div key={story.id} className="bg-[#FFF5E4] rounded-lg shadow-xl p-8 flex flex-col items-center"> {/* Using #FFF5E4 for card background */}
              <img
                src={story.image}
                alt={story.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#FF9494] shadow-md"
              />
              <p className="text-lg text-gray-700 italic mb-4">"{story.story}"</p>
              <h4 className="text-xl font-semibold text-gray-800">{story.name}</h4>
              <p className="text-md text-gray-500">{story.location}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
            {/* Using direct hex code for button background #FF9494 */}
            <a href="#" className="btn bg-[#FF9494] text-white border-none hover:bg-[#E07B7B] text-lg px-8 py-3 rounded-full shadow-lg">
                Share Your Story
            </a>
        </div>
      </div>
    </section>
  );
};

export default TouristStoriesSection;