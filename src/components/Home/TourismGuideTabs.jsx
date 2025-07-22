


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router'; 
import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios'; 

const TourismGuideTabs = () => {
  const { data: packages, isLoading: packagesLoading, isError: packagesError } = useQuery({
    queryKey: ['topPackages'],
    queryFn: async () => {
      const response = await axios.get('https://tour-system-server.vercel.app/packages');

      return response.data.slice(0, 3); 
    }
  });

  // Fetch top 3 tour guides
  const { data: tourGuides, isLoading: guidesLoading, isError: guidesError } = useQuery({
    queryKey: ['topTourGuides'],
    queryFn: async () => {
      const response = await axios.get('https://tour-system-server.vercel.app/tourGuides'); 
      return response.data.slice(0, 3); 
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
                      <p className="text-gray-600">{pkg.description.substring(0, 70)}...</p> 
                      <p className="text-xl font-bold text-[#FF9494] mt-4">${pkg.price}</p>
                      <Link
                        to={`/packages/${pkg._id}`} 
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
                      <p className="text-gray-600">{guide.specialization || 'General Guide'}</p> 
                      <p className="text-sm text-gray-500">{guide.toursCompleted || 0}+ Tours Completed</p> 
                      <Link
                        to={`/tour-guides/${guide._id}`} 
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