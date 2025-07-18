
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css'; 
// import { Link } from 'react-router';

// const TourismGuideTabs = () => {
//   return (
//     <section className="py-16 bg-[#FFD1D1] px-4"> 
//       <div className="container mx-auto">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#FF9494] mb-12"> {/* Using #FF9494 for text */}
//           Explore Our Guides & Packages
//         </h2>

//         <Tabs className="w-full max-w-6xl mx-auto">
//           <TabList className="flex justify-center mb-8 border-b border-gray-300">
//             {/* Tab styling using Tailwind (override react-tabs defaults) */}
//             <Tab className="py-3 px-6 text-xl font-semibold cursor-pointer border-b-2 border-transparent hover:border-[#FF9494] focus:outline-none data-[selected=true]:border-[#FF9494] data-[selected=true]:text-[#FF9494] text-gray-700 transition-colors duration-300">
//               Our Packages
//             </Tab>
//             <Tab className="py-3 px-6 text-xl font-semibold cursor-pointer border-b-2 border-transparent hover:border-[#FF9494] focus:outline-none data-[selected=true]:border-[#FF9494] data-[selected=true]:text-[#FF9494] text-gray-700 transition-colors duration-300 ml-4">
//               Meet Our Tour Guides
//             </Tab>
//           </TabList>

//           <TabPanel>
//             <div className="p-6 bg-white rounded-lg shadow-lg">
//               <h3 className="text-3xl font-bold text-[#FF9494] mb-6 text-center">Our Featured Packages</h3> {/* Using #FF9494 for text */}
//               <p className="text-lg text-gray-700 mb-8 text-center">
//                 Discover our curated selection of amazing tour packages. From serene beaches to majestic mountains, we have something for every traveler.
//               </p>
//               {/* Placeholder for Package Cards - These will be dynamic later */}
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {/* Dummy Package Card 1 */}
//                 <div className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center"> {/* Using #FFF5E4 */}
//                   <img src="https://i.ibb.co/N2c03d7b/sndrban.jpg" alt="Package 1" className="mx-auto mb-4 rounded-md" />
//                   <h4 className="text-xl font-semibold text-gray-800 mb-2">Sundarbans Eco Tour</h4>
//                   <p className="text-gray-600">Explore the world's largest mangrove forest.</p>
//                   <p className="text-xl font-bold text-[#FF9494] mt-4">$250</p> {/* Using #FF9494 */}
//                   <Link to="/package-details/1" className="mt-4 p-2 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]">View Details</Link>
//                 </div>
//                 {/* Dummy Package Card 2 */}
//                 <div className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center">
//                   <img src="https://i.ibb.co/GfKL6Jqx/martinbeach.jpg" alt="Package 2" className="mx-auto mb-4 rounded-md" />
//                   <h4 className="text-xl font-semibold text-gray-800 mb-2">Cox's Bazar Beach Trip</h4>
//                   <p className="text-gray-600">Relax on the longest natural sandy beach with great latenight views.</p>
//                   <p className="text-xl font-bold text-[#FF9494] mt-4">$180</p>
//                   <Link to="/package-details/2" className="mt-4 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B] p-2">View Details</Link>
//                 </div>
//                 {/* Dummy Package Card 3 */}
//                 <div className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center">
//                   <img src="https://i.ibb.co/XZ92nbhh/Screenshot-2025-07-14-164132.png" alt="Package 3" className="mx-auto mb-4 rounded-md" />
//                   <h4 className="text-xl font-semibold text-gray-800 mb-2">Sylhet Tea Garden Tour</h4>
//                   <p className="text-gray-600">Immerse yourself in lush green tea estates.</p>
//                   <p className="text-xl font-bold text-[#FF9494] mt-4">$220</p>
//                   <Link to="/package-details/3" className="mt-4 p-2 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]">View Details</Link>
//                 </div>
//               </div>
//               <div className="text-center mt-10">
//                 <Link to="/all-trips" className="btn bg-[#FF9494] text-white hover:bg-[#E07B7B] text-lg px-8 py-3 rounded-full shadow-lg">
//                   View All Packages
//                 </Link>
//               </div>
//             </div>
//           </TabPanel>

//           <TabPanel>
//             <div className="p-6 bg-white rounded-lg shadow-lg">
//               <h3 className="text-3xl font-bold text-[#FF9494] mb-6 text-center">Meet Our Expert Tour Guides</h3> {/* Using #FF9494 for text */}
//               <p className="text-lg text-gray-700 mb-8 text-center">
//                 Our guides are passionate locals with extensive knowledge, ensuring you have an authentic and insightful journey.
//               </p>
//               {/* Placeholder for Tour Guide Cards - These will be dynamic later */}
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {/* Dummy Tour Guide Card 1 */}
//                 <div className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center">
//                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmt7mgLLJbU_An415Sur0-Iq8kRKQzzAwCw&s" alt="Guide 1" className="mx-auto mb-4 w-24 h-24 rounded-full object-cover" />
//                   <h4 className="text-xl font-semibold text-gray-800 mb-1">Md. Aminul Islam</h4>
//                   <p className="text-gray-600">Expert in Historical Sites</p>
//                   <p className="text-sm text-gray-500">22+ Tours Completed</p>
//                   <Link to="/tour-guide/aminul" className="mt-4 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]">View Profile</Link>
//                 </div>
//                 {/* Dummy Tour Guide Card 2 */}
//                 <div className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center">
//                   <img src="https://media.istockphoto.com/id/1292137633/photo/outdoor-waist-up-portrait-of-a-beautiful-woman-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=90Sz-TNYftQ38zBP2_2qmWOJPQwkyEjNZLP7zyT7CC8=" alt="Guide 2" className="mx-auto mb-4 w-24 h-24 rounded-full object-cover" />
//                   <h4 className="text-xl font-semibold text-gray-800 mb-1">Fatema Akter</h4>
//                   <p className="text-gray-600">Eco-Tourism Specialist</p>
//                   <p className="text-sm text-gray-500">17+ Tours Completed</p>
//                   <Link to="/tour-guide/fatema" className="mt-4 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]">View Profile</Link>
//                 </div>
//                 {/* Dummy Tour Guide Card 3 */}
//                 <div className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center">
//                   <img src="https://media.gettyimages.com/id/2173206816/video/video-portrait-of-an-indian-man.jpg?s=640x640&k=20&c=SrqbwaCRY9KFykN7Sw0pwNCIUNZfSHEDI6V6ILrhdaY=" alt="Guide 3" className="mx-auto mb-4 w-24 h-24 rounded-full object-cover" />
//                   <h4 className="text-xl font-semibold text-gray-800 mb-1">Rahim Chowdhury</h4>
//                   <p className="text-gray-600">Adventure Tour Lead</p>
//                   <p className="text-sm text-gray-500">38+ Tours Completed</p>
//                   <Link to="/tour-guide/rahim" className="mt-4 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]">View Profile</Link>
//                 </div>
//               </div>
//               <div className="text-center mt-10">
//                 <Link to="/all-tour-guides" className="btn bg-[#FF9494] text-white hover:bg-[#E07B7B] text-lg px-8 py-3 rounded-full shadow-lg">
//                   View All Guides
//                 </Link>
//               </div>
//             </div>
//           </TabPanel>
//         </Tabs>
//       </div>
//     </section>
//   );
// };

// export default TourismGuideTabs;



import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router'; // <--- CHANGE 1: Import Link from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'; // For fetching dynamic data
import axios from 'axios'; // For making API calls

const TourismGuideTabs = () => {
  // Fetch top 3 packages
  const { data: packages, isLoading: packagesLoading, isError: packagesError } = useQuery({
    queryKey: ['topPackages'],
    queryFn: async () => {
      // Fetch all packages and then slice to get top 3
      const response = await axios.get('http://localhost:5000/packages');
      // You might want to sort them by a 'popularity' or 'rating' field if you add one
      return response.data.slice(0, 3); // Get only the first 3
    }
  });

  // Fetch top 3 tour guides
  const { data: tourGuides, isLoading: guidesLoading, isError: guidesError } = useQuery({
    queryKey: ['topTourGuides'],
    queryFn: async () => {
      // Assuming you have a /tour-guides endpoint
      const response = await axios.get('http://localhost:5000/tourGuides'); // <--- IMPORTANT: Ensure this backend endpoint exists
      // You might want to sort them by 'experience' or 'rating'
      return response.data.slice(0, 3); // Get only the first 3
    }
  });

  if (packagesLoading || guidesLoading) {
    return (
      <section className="py-16 bg-[#FFD1D1] px-4">
        <div className="container mx-auto text-center text-xl font-semibold text-gray-700">
          Loading content...
        </div>
      </section>
    );
  }

  if (packagesError || guidesError) {
    return (
      <section className="py-16 bg-[#FFD1D1] px-4">
        <div className="container mx-auto text-center text-xl font-bold text-red-600">
          Error loading content. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#FFD1D1] px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#FF9494] mb-12">
          Explore Our Guides & Packages
        </h2>

        <Tabs className="w-full max-w-6xl mx-auto">
          <TabList className="flex justify-center mb-8 border-b border-gray-300">
            <Tab className="py-3 px-6 text-xl font-semibold cursor-pointer border-b-2 border-transparent hover:border-[#FF9494] focus:outline-none data-[selected=true]:border-[#FF9494] data-[selected=true]:text-[#FF9494] text-gray-700 transition-colors duration-300">
              Our Packages
            </Tab>
            <Tab className="py-3 px-6 text-xl font-semibold cursor-pointer border-b-2 border-transparent hover:border-[#FF9494] focus:outline-none data-[selected=true]:border-[#FF9494] data-[selected=true]:text-[#FF9494] text-gray-700 transition-colors duration-300 ml-4">
              Meet Our Tour Guides
            </Tab>
          </TabList>

          <TabPanel>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-[#FF9494] mb-6 text-center">Our Featured Packages</h3>
              <p className="text-lg text-gray-700 mb-8 text-center">
                Discover our curated selection of amazing tour packages. From serene beaches to majestic mountains, we have something for every traveler.
              </p>
              {packages.length === 0 ? (
                <div className="text-center text-xl text-gray-600 py-8">No featured packages available.</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg) => (
                    <div key={pkg._id} className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center">
                      <img src={pkg.image} alt={pkg.tripTitle} className="mx-auto mb-4 rounded-md w-full h-48 object-cover" />
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">{pkg.tripTitle}</h4>
                      <p className="text-gray-600">{pkg.description.substring(0, 70)}...</p> {/* Shorten description */}
                      <p className="text-xl font-bold text-[#FF9494] mt-4">${pkg.price}</p>
                      <Link
                        to={`/packages/${pkg._id}`} // <--- CHANGE 2: Dynamic Link to PackageDetails
                        className="mt-4 p-2 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center mt-10">
                <Link to="/all-trips" className="btn bg-[#FF9494] text-white hover:bg-[#E07B7B] text-lg px-8 py-3 rounded-full shadow-lg">
                  View All Packages
                </Link>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-[#FF9494] mb-6 text-center">Meet Our Expert Tour Guides</h3>
              <p className="text-lg text-gray-700 mb-8 text-center">
                Our guides are passionate locals with extensive knowledge, ensuring you have an authentic and insightful journey.
              </p>
              {tourGuides.length === 0 ? (
                <div className="text-center text-xl text-gray-600 py-8">No tour guides available.</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tourGuides.map((guide) => (
                    <div key={guide._id} className="bg-[#FFF5E4] rounded-lg shadow-md p-6 text-center hover:border-2 hover:border-pink-400 ">
                      <img src={guide.profileImage || 'https://via.placeholder.com/60'} alt={guide.name} className="mx-auto mb-4 w-24 h-24 rounded-full object-cover" />
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">{guide.name}</h4>
                      <p className="text-gray-600">{guide.specialization || 'General Guide'}</p> {/* Assuming specialization field */}
                      <p className="text-sm text-gray-500">{guide.toursCompleted || 0}+ Tours Completed</p> {/* Assuming toursCompleted field */}
                      <Link
                        to={`/tour-guides/${guide._id}`} // <--- CHANGE 3: Dynamic Link to TourGuideProfile
                        className="mt-4 py-2 inline-block btn bg-[#FF9494] text-white hover:bg-[#E07B7B]"
                      >
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center mt-10">
                <Link to="/all-tour-guides" className="btn bg-[#FF9494] text-white hover:bg-[#E07B7B] text-lg px-8 py-3 rounded-full shadow-lg">
                  View All Guides
                </Link>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TourismGuideTabs;