// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiAlertTriangle, FiUserCheck } from 'react-icons/fi';

// export default function UpdateSite() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     anomalies: {
//       helmet: false,
//       vest: false,
//       max_persons: 0,
//       gloves: false,
//       safetyBoots: false,
//       faceShield: false,
//       otherPPE: false,
//     },
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//    const [Mysites , setMysites] = useState([]);
  
//     // const UserId  = useSelector((state) => state.global.userId);
//     const UserId  = '675ab86697f7d751f7c1030b'


//   const fetchyourSites = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
//       console.log("Response data:", response.data);
  
//       // Transform the response data
//       const allSites = response.data;

      
  
//       const updatedSiteData = allSites.map((site) => ({
//         SiteID: site._id,
//         SiteName: site.SiteName ,// Use either `SiteName` or `name`
//         SiteAddress: site.SiteAddress , // Use either `SiteAddress` or `address`
//         City: site.City ,
//         Sensitivity: site.Sensitivity , // Default value if `Sensitivity` is missing
//         Active: site.Active  // Ensure `Active` is handled correctly
//       }));
  
//       // Update state
//       setMysites(updatedSiteData);
//       // console.log("Transformed Mysites:", updatedSiteData);
//       console.log("All Mysite:", Mysites);
//       console.log("All Mysite:", Mysites.length);
//     } catch (error) {
//       console.error("Error fetching site data:", error);
//     }
//   };

  
//   useEffect(() => {
   
//       fetchyourSites();
//   }, []);


  


//   const handleChange = (e) => {
//     const { id, type, checked, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       anomalies: {
//         ...prev.anomalies,
//         [id]: type === 'checkbox' ? checked : parseInt(value, 10),
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const siteId = '67568f966c30857d4ba393dc'; // Replace with actual Site ID

//     try {
//       const res = await fetch('http://localhost:5000/Anomaly_Details/SetAnoamly', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           siteId,
//           anomalies: formData.anomalies,
//         }),
//       });

//       const data = await res.json();
//       setLoading(false);
//       if (!data.success) {
//         setError(data.message);
//       } else {
//         navigate(`/site/${siteId}`);
//       }
//     } catch (err) {
//       setError('Error updating site.');
//       setLoading(false);
//     }
//   };

//   return (
//     <main className='p-5 max-w-5xl mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-6'>Update Site Anomalies</h1>
//       <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-6'>
//         <h3 className='text-xl font-semibold mt-6'>Anomalies to Detect:</h3>
//         <div className='border p-4 rounded-lg'>
//           <div className='flex flex-wrap gap-6'>
//             {Object.keys(formData.anomalies).map((anomaly) => (
//               <div className='flex items-center gap-2 w-1/4' key={anomaly}>
//                 <input
//                   type={anomaly === 'max_persons' ? 'number' : 'checkbox'}
//                   id={anomaly}
//                   className='w-5 h-6'
//                   onChange={handleChange}
//                   checked={formData.anomalies[anomaly]}
//                   value={formData.anomalies[anomaly]}
//                 />
//                 {anomaly === 'max_persons' ? (
//                   <FiUserCheck className='text-blue-700' />
//                 ) : (
//                   <FiAlertTriangle className='text-red-600' />
//                 )}
//                 <span>{anomaly.replace(/([A-Z])/g, ' $1')}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button
//           type='submit'
//           className='w-full py-3 mt-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg'
//           disabled={loading}
//         >
//           {loading ? 'Updating...' : 'Update Anomalies'}
//         </button>
//         {error && <p className='text-red-600 text-center mt-4'>{error}</p>}
//       </form>
//     </main>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiUserCheck } from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UpdateSite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    anomalies: {
      Hardhat: false,
      SafetyVests: false,
      gloves: false,
      safetyBoots: false,
      faceShield: false,
      otherPPE: false,
      enable_max_persons: false, // New checkbox
      max_persons: 0,
    },
  });
  const [selectedSite, setSelectedSite] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Mysites, setMysites] = useState([]);

  const UserId = useSelector((state) => state.global.userId);

  const fetchYourSites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Site/myAll/${UserId}`);
      const allSites = response.data;
      const updatedSiteData = allSites.map((site) => ({
        SiteID: site._id,
        SiteName: site.SiteName,
        SiteAddress: site.SiteAddress,
        City: site.City,
        Sensitivity: site.Sensitivity,
        Active: site.Active,
      }));

      setMysites(updatedSiteData);
    } catch (error) {
      console.error("Error fetching site data:", error);
    }
  };

  useEffect(() => {
    fetchYourSites();
  }, []);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      anomalies: {
        ...prev.anomalies,
        [id]: type === "checkbox" ? checked : Math.max(0, parseInt(value, 10)), // Ensure min value is 0
      },
    }));
  };

  const handleSiteSelection = (e) => {
    setSelectedSite(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!selectedSite) {
      setError("Please select a site.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/Anomaly_Details/SetAnoamly", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteId: selectedSite,
          anomalies: formData.anomalies,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message);
      } else {
        navigate(`/dashboard/supervisor/anomalyparameters`);
      }
    } catch (err) {
      setError("Error updating site.");
      setLoading(false);
    }
  };

  return (
    <main className="p-5 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">
        Update Site Anomalies
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <label htmlFor="site-dropdown" className="text-xl font-semibold">
          Select Site:
        </label>
        <select
          id="site-dropdown"
          value={selectedSite}
          onChange={handleSiteSelection}
          className="w-full p-3 border rounded-lg text-black"
        >
          <option value="" disabled className="text-black">
            Choose a Site
          </option>
          {Mysites.map((site) => (
            <option key={site.SiteID} value={site.SiteID} className="text-black">
              {site.SiteName}
            </option>
          ))}
        </select>

        {selectedSite && (
          <>
            <h3 className="text-xl font-semibold mt-6">Anomalies to Detect:</h3>
            <div className="border p-4 rounded-lg">
              <div className="flex flex-wrap gap-6">
                {/* Render Checkboxes First */}
                {Object.keys(formData.anomalies)
                  .filter(
                    (anomaly) => anomaly !== "max_persons" && anomaly !== "enable_max_persons"
                  )
                  .map((anomaly) => (
                    <div className="flex items-center gap-2 w-1/4" key={anomaly}>
                      <input
                        type="checkbox"
                        id={anomaly}
                        className="w-6 h-6 rounded-md border-2 border-gray-400 focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        checked={formData.anomalies[anomaly]}
                      />
                      <FiAlertTriangle className="text-red-600" />
                      <span>{anomaly.replace(/([A-Z])/g, " $1")}</span>
                    </div>
                  ))}

                {/* Enable Max Persons Detection Checkbox */}
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enable_max_persons"
                      className="w-6 h-6 rounded-md border-2 border-gray-400 focus:ring-2 focus:ring-blue-500"
                      onChange={handleChange}
                      checked={formData.anomalies.enable_max_persons}
                    />
                    <FiAlertTriangle className="text-red-600" />
                    <span>Enable Max Persons Detection</span>
                  </div>
                </div>

                {/* Show max_persons input only if the checkbox is checked */}
                {formData.anomalies.enable_max_persons && (
                  <div className="w-full mt-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FiUserCheck className="text-blue-700" />
                      Select Max Persons you want to detect:
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        id="max_persons"
                        min="0"
                        className="w-14 h-8 p-2 text-lg border rounded bg-white text-black dark:bg-gray-700 dark:text-black appearance-none"
                        onChange={handleChange}
                        value={formData.anomalies.max_persons}
                      />
                      <FiUserCheck className="text-blue-700" />
                      <span>Select Max Persons</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Anomalies"}
        </button>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </main>
  );
}

