import React, { useState, useEffect, useRef } from "react"; // Importing useState, useEffect, and useRef
import { Carousel } from "react-responsive-carousel"; // Importing Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing styles
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Importing arrow icons

import sliderImage1 from "./image1.jpg";
import sliderImage2 from "./image3.jpg";
import sliderImage3 from "./image2.jpg";
import safeSiteImage from "./image.jpg";
import "./typewriter.css";
import NewHeader from "@components/NewHeader";

import inciimage1 from "./incident1.jpeg";
import inciimage2 from "./incident3.jpg";
import inciimage3 from "./incident2.png";

const LandingPage = () => {
  // State for counting numbers
  const [workersProtected, setWorkersProtected] = useState(0);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [officeLocations, setOfficeLocations] = useState(0);
  const [appreciations, setAppreciations] = useState(0);
  const [hasStartedCounting, setHasStartedCounting] = useState(false); // Flag to track if counting started

  const countSectionRef = useRef(null); // Reference to the section for counting

  // Counting effect using useEffect hook
  useEffect(() => {
    const countUp = (target, setState) => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < target) {
          count += 10; // Adjust increment to control speed
          setState(count);
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust interval time for smoother animation
    };

    if (hasStartedCounting) {
      countUp(991, setWorkersProtected);
      countUp(40, setYearsOfExperience);
      countUp(40, setOfficeLocations);
      countUp(2093, setAppreciations);
    }
  }, [hasStartedCounting]);

  // IntersectionObserver to trigger counting when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStartedCounting(true); // Start counting when section is in view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (countSectionRef.current) {
      observer.observe(countSectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (countSectionRef.current) {
        observer.unobserve(countSectionRef.current);
      }
    };
  }, []);

  return (
   
    <div>
       <NewHeader/>
      {/* About SafeSite+ */}
      <section className="text-white pt-12 text-center" >
        <h1 className="text-4xl font-bold mb-4 text-slate-600 animate-typewriter">
          About SafeSite Plus+
        </h1>
      </section>

      {/* Slider using react-responsive-carousel */}
      <section className="relative my-8">
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          autoPlay={true}
          interval={3000}
          transitionTime={500}
        >
          <div>
            <img
              src={sliderImage1}
              alt="Slide 1"
              className="w-full h-72 object-cover"
            />
          </div>
          <div>
            <img
              src={sliderImage2}
              alt="Slide 2"
              className="w-full h-72 object-cover"
            />
          </div>
          <div>
            <img
              src={sliderImage3}
              alt="Slide 3"
              className="w-full h-72 object-cover"
            />
          </div>
        </Carousel>
      </section>

      {/* Mission Statement */}
      <section className="py-8 px-9">
        <h2 className="text-3xl font-bold mb-4 text-slate-700">Mission Statement</h2>
        <p className="text-lg text-slate-600">
          Our mission is to revolutionize construction site management by providing a cutting-edge,
          technology-driven platform that ensures unparalleled safety, enhances productivity,
          and fosters operational excellence. By integrating real-time monitoring, advanced anomaly
          detection through computer vision, and efficient incident management tools, we aim to
          create a secure and highly efficient working environment. Our customizable notifications
          and comprehensive data analytics enable proactive decision-making, allowing supervisors
          to identify and address potential risks before they escalate. We are committed to empowering
          organizations with innovative solutions that prioritize worker well-being, minimize
          incidents, and streamline operations, ensuring that every construction project achieves
          its goals safely and efficiently.
        </p>
      </section>

      {/* Services */}
      <section className="py-8 px-9 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-slate-700">Services</h2>
        <p className="text-lg text-slate-600 mb-4">
          We offer a comprehensive range of services to enhance construction site safety and efficiency:
        </p>
        <ul className="text-lg text-slate-600 list-disc list-inside">
          <li className="text-slate-700">Real-time monitoring for instant data access and anomaly detection.</li>
          <li className="text-slate-700">Advanced computer vision to identify risks and hazards.</li>
          <li className="text-slate-700">Efficient incident reporting and resolution processes.</li>
          <li className="text-slate-700">Customizable alerts to keep stakeholders informed.</li>
          <li className="text-slate-700">Detailed analytics for informed decision-making.</li>
          <li className="text-slate-700">Enhanced tools for safety and performance reporting.</li>
        </ul>
      </section>

      {/* Reason for Development */}
      <section className="py-8 px-9 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-slate-700">Reason for Development</h2>
        <p className="text-lg text-slate-600">
          SafeSite+ was developed to address the critical need for improved worker safety,
          efficient site management, and compliance with modern safety standards.
        </p>
        
        {/* Tragic Incidents */}
        <section className="pb-8 pt-6">
          <h6 className="text-xl font-bold mb-4 text-slate-700">
            Some Tragic Incidents <span className="text-sm">(Main Focus To Develop our System)</span>
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="incident-card bg-white p-4 rounded-md shadow-lg">
              <img src={inciimage1} alt="Incident 1" className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="text-md font-semibold mb-2 text-slate-700">Date: Jan 15, 2024</p>
              <p className="text-sm text-slate-600">
                A tragic incident occurred in Lahore where a construction worker fell from an unprotected scaffold.
                The worker was not provided with proper fall arrest systems, leading to severe injuries and eventual death.
                The lack of Personal Protective Equipment (PPE) contributed to the fatality.
              </p>
            </div>
            
            <div className="incident-card bg-white p-4 rounded-md shadow-lg">
              <img src={inciimage2} alt="Incident 2" className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="text-md font-semibold mb-2 text-slate-700">Date: Mar 22, 2023</p>
              <p className="text-sm text-slate-600">
                In Karachi, a tragic incident occurred at a high-rise construction site when <span className="text-red-700 font-bold">a worker fell from the 7th floor</span> while working without proper fall protection gear. 
                The worker was reportedly not wearing a safety harness or helmet. This resulted in a fatal injury, highlighting the negligence in providing essential PPE on site.
              </p>
            </div>
            
            <div className="incident-card bg-white p-4 rounded-md shadow-lg">
              <img src={inciimage3} alt="Incident 3" className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="text-md font-semibold mb-2 text-slate-700">Date: Dec 5, 2022</p>
              <p className="text-sm text-slate-600">
                On a construction project in Islamabad, a deadly electrical explosion occurred due to the
                improper handling of live wires. The workers involved were not wearing electrical-insulating gloves,
                leading to severe burns and injuries. Despite the presence of electrical hazards,<span className="text-red-700 font-bold"> the necessary
                PPE was not provided,</span> resulting in a tragic loss.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Banner with Counting Numbers */}
      <section ref={countSectionRef} className="bg-slate-100 text-white py-8">
        <div className="flex justify-around max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#f59e0b]">{workersProtected}</h3>
            <p className="text-slate-600 font-bold">Workers Protected</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#f59e0b]">{yearsOfExperience}</h3>
            <p className="text-slate-600 font-bold">Years of Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#f59e0b]">{officeLocations}</h3>
            <p className="text-slate-600 font-bold">Office Locations</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#f59e0b]">{appreciations}+</h3>
            <p className="text-slate-600 font-bold">Appreciations</p>
          </div>
        </div>
      </section>

{/* Banner with Two Columns - Green Background */}
<section className="bg-green-900 text-white">
  <div className="flex flex-wrap max-w-7xl mx-auto">
    {/* Left Column */}
    <div className="w-full lg:w-1/2 mb-6 lg:mb-0 py-12 px-6">
      <h2 className="text-4xl font-bold mb-6">SafeSite Plus+</h2>
      <p className="text-lg">Organization You Can Trust!</p>
      <p className="text-sm mt-4">
        24/7 availability for all your safety needs. We are committed to
        delivering top-notch services to enhance safety and productivity.
      </p>
      <p className="text-sm mt-4">For queries, contact here!</p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-6">
        Contact Us
      </button>
    </div>

    {/* Right Column */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <div className="relative w-full h-full">
        <img
          src={safeSiteImage}
          alt="SafeSite+"
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg opacity-60"
        />
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default LandingPage;