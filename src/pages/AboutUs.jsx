// src/pages/AboutUs.jsx
// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const AboutUs = () => {
//     // Data for team members - IMPORTANT: Replace with your actual team's info and real image URLs!
//     const teamMembers = [
//         {
//             name: "Atanu Paul",
//             role: "Founder & Lead Developer",
//             bio: "Commited to creating seamless travel experiences and Experienced webDeveloper.",
//             image: "https://www.shutterstock.com/image-photo/happy-middle-aged-50-years-260nw-2426323983.jpg", 
//             linkedin: "https://www.linkedin.com/in/atanupaul",
//             github: "https://github.com/atanupaul"
//         },
//         {
//             name: "Catherine Forkley", 
//             role: "Marketing & Community Manager",
//             bio: "Building vibrant communities and sharing TourBD's story with the world.",
//             image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg", 
//             linkedin: "https://www.linkedin.com/in/fatemaakter",
//             github: null
//         },
//         {
//             name: "Md. Josh Garfield", 
//             role: "Cheif Advisor",
//             bio: "Experienced guide with a deep knowledge of Bangladeshi culture  . Loves storytelling.",
//             image: "https://thumbs.dreamstime.com/b/old-rich-man-sun-glasses-beard-street-smiling-happy-portrait-186141549.jpg", 
//             linkedin: "https://www.linkedin.com/in/aminulislam",
//             github: null
//         },
//         {
//             name: "Hamza Chowdhury", 
//             role: "Operations Manager",
//             bio: "Ensuring smooth operations and logistics for all TourBD adventures, from start to finish.",
//             image: "https://www.shutterstock.com/shutterstock/videos/3484805877/thumb/5.jpg?ip=x480", 
//             linkedin: "https://www.linkedin.com/in/rahimchowdhury",
//             github: null
//         },
//         {
//             name: "Rick Jeson", 
//             role: "Backend Developer",
//             bio: "Crafting robust and efficient server-side solutions to power TourBD's services.",
//             image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzM4NWa4vn54LnUGlQG03XVvakM9aNT2LS19eTEpO_17wWnCuykR8nlC4GVleJ6gzI5yY&usqp=CAU", 
//             linkedin: "https://www.linkedin.com/in/bijoypaul",
//             github: "https://github.com/bijoypaul"
//         },
//         {
//             name: "Md. Rizowaan Bid Asad", 
//             role: "Finance Director",
//             bio: "Crafting robust and efficient budget sollution for TourBD's",
//             image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpYasq5XN9NoHBKJ3FCITnAI5ydobEgtiBA&s", 
//             linkedin: "https://www.linkedin.com/in/bijoypaul",
//             github: "https://github.com/bijoypaul"
//         }
//     ];

//     // Settings for the slick carousel
//     const sliderSettings = {
//         dots: false, // No dots navigation
//         infinite: true, // Loop slides
//         speed: 500, // Transition speed
//         slidesToShow: 3, // How many slides to show at once
//         slidesToScroll: 1, // How many slides to scroll at a time
//         autoplay: true, // Auto-play slides
//         autoplaySpeed: 3000, // Time between slides (3 seconds)
//         arrows: false, // Hide navigation arrows
//         responsive: [
//             {
//                 breakpoint: 1024, // Laptop/desktop
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 768, // Tablet
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             }
//         ]
//     };

//     return (
//         <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
//             <header className="text-center mb-12">
//                 <h1 className="text-5xl font-extrabold text-[#FF9494] mb-4 tracking-tight">
//                     About TourBD
//                 </h1>
//                 <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//                     We are dedicated to providing unforgettable travel experiences and making every journey a story worth telling.
//                 </p>
//             </header>

//             {/* Our Mission/Vision Section */}
//             <section className="bg-white p-10 rounded-xl shadow-lg mb-12 text-center">
//                 <h2 className="text-4xl font-extrabold text-[#FF9494] mb-6">Our Mission</h2>
//                 <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
//                     At TourBD, our mission is to connect travelers with the authentic beauty and rich culture of Bangladesh, ensuring reliable, safe, and truly memorable adventures for everyone. We strive to be the most trusted travel platform in the region.
//                 </p>
//             </section>

//             {/* Meet the Team Section with Carousel */}
//             <section className="mb-12">
//                 <h2 className="text-4xl font-extrabold text-[#FF9494] text-center mb-8">Meet Our Team</h2>
//                 {teamMembers.length > 0 ? (
//                     <Slider {...sliderSettings}>
//                         {teamMembers.map((member, index) => (
//                             <div key={index} className="p-4"> {/* Add padding for spacing between slides */}
//                                 <div className="bg-white p-8 rounded-xl shadow-lg text-center h-full flex flex-col items-center justify-between border border-gray-100">
//                                     <img 
//                                         src={member.image} 
//                                         alt={member.name} 
//                                         className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#FF9494]"
//                                     />
//                                     <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
//                                     <p className="text-lg font-semibold text-[#FF9494] mb-3">{member.role}</p>
//                                     <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow">{member.bio}</p>
//                                     <div className="flex justify-center space-x-4 mt-auto"> {/* mt-auto pushes social icons to bottom */}
//                                         {member.linkedin && (
//                                             <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF9494] transition-colors">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
//                                             </a>
//                                         )}
//                                         {member.github && (
//                                             <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF9494] transition-colors">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.49.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.193-6.085 8.193-11.389 0-6.627-5.373-12-12-12z"/></svg>
//                                             </a>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 ) : (
//                     <p className="text-center text-gray-600 text-xl">No team members to display yet. Please add team data!</p>
//                 )}
//             </section>

//             {/* Project Links Section */}
//             {/* <section className="bg-white p-10 rounded-xl shadow-lg text-center">
//                 <h2 className="text-4xl font-bold text-gray-800 mb-6">Project Resources</h2>
//                 <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
//                     <a 
//                         href="https://github.com/your-repo/TourBD-Frontend" // Replace with your frontend repo
//                         target="_blank" 
//                         rel="noopener noreferrer" 
//                         className="text-lg text-[#FF9494] hover:underline flex items-center justify-center"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.49.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.193-6.085 8.193-11.389 0-6.627-5.373-12-12-12z"/></svg>
//                         Frontend Repository
//                     </a>
//                     <a 
//                         href="https://github.com/your-repo/TourBD-Backend" // Replace with your backend repo
//                         target="_blank" 
//                         rel="noopener noreferrer" 
//                         className="text-lg text-[#FF9494] hover:underline flex items-center justify-center"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.49.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.193-6.085 8.193-11.389 0-6.627-5.373-12-12-12z"/></svg>
//                         Backend Repository
//                     </a>
//                 </div>
//             </section> */}
//         </div>
//     );
// };

// export default AboutUs;


// code 2 animation added //
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion'; // Import motion from framer-motion

const AboutUs = () => {
    // Data for team members - IMPORTANT: Replace with your actual team's info and real image URLs!
    const teamMembers = [
        {
            name: "Atanu Paul",
            role: "Founder & Lead Developer",
            bio: "Commited to creating seamless travel experiences and Experienced webDeveloper.",
            image: "https://www.shutterstock.com/image-photo/happy-middle-aged-50-years-260nw-2426323983.jpg", 
            linkedin: "https://www.linkedin.com/in/atanupaul",
            github: "https://github.com/atanupaul"
        },
        {
            name: "Catherine Forkley", 
            role: "Marketing & Community Manager",
            bio: "Building vibrant communities and sharing TourBD's story with the world.",
            image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg", 
            linkedin: "https://www.linkedin.com/in/fatemaakter",
            github: null
        },
        {
            name: "Md. Josh Garfield", 
            role: "Cheif Advisor",
            bio: "Experienced guide with a deep knowledge of Bangladeshi culture  . Loves storytelling.",
            image: "https://thumbs.dreamstime.com/b/old-rich-man-sun-glasses-beard-street-smiling-happy-portrait-186141549.jpg", 
            linkedin: "https://www.linkedin.com/in/aminulislam",
            github: null
        },
        {
            name: "Hamza Chowdhury", 
            role: "Operations Manager",
            bio: "Ensuring smooth operations and logistics for all TourBD adventures, from start to finish.",
            image: "https://www.shutterstock.com/shutterstock/videos/3484805877/thumb/5.jpg?ip=x480", 
            linkedin: "https://www.linkedin.com/in/rahimchowdhury",
            github: null
        },
        {
            name: "Rick Jeson", 
            role: "Backend Developer",
            bio: "Crafting robust and efficient server-side solutions to power TourBD's services.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzM4NWa4vn54LnUGlQG03XVvakM9aNT2LS19eTEpO_17wWnCuykR8nlC4GVleJ6gzI5yY&usqp=CAU", 
            linkedin: "https://www.linkedin.com/in/bijoypaul",
            github: "https://github.com/bijoypaul"
        },
        {
            name: "Md. Rizowaan Bid Asad", 
            role: "Finance Director",
            bio: "Crafting robust and efficient budget sollution for TourBD's",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpYasq5XN9NoHBKJ3FCITnAI5ydobEgtiBA&s", 
            linkedin: "https://www.linkedin.com/in/bijoypaul",
            github: "https://github.com/bijoypaul"
        }
    ];

    // Settings for the slick carousel
    const sliderSettings = {
        dots: false, // No dots navigation
        infinite: true, // Loop slides
        speed: 500, // Transition speed
        slidesToShow: 3, // How many slides to show at once
        slidesToScroll: 1, // How many slides to scroll at a time
        autoplay: true, // Auto-play slides
        autoplaySpeed: 3000, // Time between slides (3 seconds)
        arrows: false, // Hide navigation arrows
        responsive: [
            {
                breakpoint: 1024, // Laptop/desktop
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    // Framer Motion variants for animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        }
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header className="text-center mb-12">
                <motion.h1 
                    className="text-5xl font-extrabold text-[#FF9494] mb-4 tracking-tight"
                    variants={itemVariants}
                >
                    About TourBD
                </motion.h1>
                <motion.p 
                    className="text-xl text-gray-700 max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    We are dedicated to providing unforgettable travel experiences and making every journey a story worth telling.
                </motion.p>
            </header>

            {/* Our Mission/Vision Section */}
            <motion.section 
                className="bg-white p-10 rounded-xl shadow-lg mb-12 text-center"
                variants={itemVariants}
            >
                <h2 className="text-4xl font-extrabold text-[#FF9494] mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    At TourBD, our mission is to connect travelers with the authentic beauty and rich culture of Bangladesh, ensuring reliable, safe, and truly memorable adventures for everyone. We strive to be the most trusted travel platform in the region.
                </p>
            </motion.section>

            {/* Meet the Team Section with Carousel */}
            <section className="mb-12">
                <motion.h2 
                    className="text-4xl font-extrabold text-[#FF9494] text-center mb-8"
                    variants={itemVariants}
                >
                    Meet Our Team
                </motion.h2>
                {teamMembers.length > 0 ? (
                    // This div is added to allow Framer Motion to apply staggerChildren to the carousel items
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        variants={containerVariants}
                    > 
                        <Slider {...sliderSettings}>
                            {teamMembers.map((member, index) => (
                                <div key={index} className="p-4"> {/* Original padding retained */}
                                    <motion.div 
                                        className="bg-white p-8 rounded-xl shadow-lg text-center h-full flex flex-col items-center justify-between border border-gray-100"
                                        variants={cardVariants} // Apply card variants
                                    >
                                        <img 
                                            src={member.image} 
                                            alt={member.name} 
                                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#FF9494]"
                                        />
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                                        <p className="text-lg font-semibold text-[#FF9494] mb-3">{member.role}</p>
                                        <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow">{member.bio}</p>
                                        <div className="flex justify-center space-x-4 mt-auto"> {/* mt-auto pushes social icons to bottom */}
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF9494] transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                                </a>
                                            )}
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF9494] transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.49.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.193-6.085 8.193-11.389 0-6.627-5.373-12-12-12z"/></svg>
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </Slider>
                    </motion.div>
                ) : (
                    <p className="text-center text-gray-600 text-xl">No team members to display yet. Please add team data!</p>
                )}
            </section>

            {/* Project Links Section */}
            {/* <section className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Project Resources</h2>
                <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
                    <a 
                        href="https://github.com/your-repo/TourBD-Frontend" // Replace with your frontend repo
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lg text-[#FF9494] hover:underline flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.49.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.193-6.085 8.193-11.389 0-6.627-5.373-12-12-12z"/></svg>
                        Frontend Repository
                    </a>
                    <a 
                        href="https://github.com/your-repo/TourBD-Backend" // Replace with your backend repo
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lg text-[#FF9494] hover:underline flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.74.08-.725.08-.725 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.49.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.193-6.085 8.193-11.389 0-6.627-5.373-12-12-12z"/></svg>
                        Backend Repository
                    </a>
                </div>
            </section> */}
        </motion.div>
    );
};

export default AboutUs;

