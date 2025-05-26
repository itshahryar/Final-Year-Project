// 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCamera, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import Contact from "../../components/Contact"; // Import the Contact component
import axios from "axios";

export default function Listing() {
  const [copied, setCopied] = useState(false);
  const [specificSite, setSpecific] = useState(null);
  const { siteId } = useParams();

  const fetchSpecificSite = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Site/SpecificSite/${siteId}`
      );

      if (response && response.data) {
        const mydata = response.data;
        const tempSite = {
          siteId: mydata.SiteID,
          siteName: mydata.SiteName,
          Active: mydata.Active,
          Sensitivity: mydata.Sensitivity,
          SiteAddress: mydata.SiteAddresss,
          City: mydata.City,
          media: "http://localhost:8000/stream-video/processed_indianworkers.mp4",
        };
        setSpecific(tempSite);
      } else {
        console.error("No data found for the site.");
      }
    } catch (e) {
      console.error("Error fetching specific site data:", e);
    }
  };

  useEffect(() => {
    fetchSpecificSite();
  }, [siteId]);

  if (!specificSite) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">Loading site details...</p>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4 my-7 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* Camera View Section */}
      <div className="h-[500px] rounded-lg overflow-hidden">
        <img
          src={`http://localhost:8000/stream-video/${specificSite.siteName}.mp4`}
          className="w-full h-full object-cover"
          alt="Camera Feed"
        />
      </div>

      {/* Site Details */}
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {specificSite.siteName}
        </h2>
        <div
          className="border rounded-full w-10 h-10 flex justify-center items-center bg-gray-200 dark:bg-gray-700 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        >
          <FaShare className="text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      {copied && (
        <p className="fixed top-20 right-5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-md">
          Link copied!
        </p>
      )}

      {/* Address Section */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-4">
        <FaMapMarkerAlt className="text-green-600" />
        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
          {specificSite.SiteAddress}
        </span>
      </div>

      {/* Active or Inactive Status */}
      <div className="mt-4">
        <p
          className={`w-full max-w-[200px] text-center p-2 rounded-md text-white ${
            specificSite.Active ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {specificSite.Active ? "Active" : "Inactive"}
        </p>
      </div>

      {/* Description Section */}
      <p className="text-gray-700 dark:text-gray-300 mt-4">
        <span className="font-semibold text-gray-900 dark:text-gray-200">Description:</span>{" "}
        {specificSite.City} <br />
        <span className="font-semibold">Sensitivity:</span> {specificSite.Sensitivity}
      </p>

      {/* Features Section */}
      <ul className="text-gray-800 dark:text-gray-300 font-semibold text-sm flex flex-wrap gap-4 sm:gap-6 mt-6">
        <li className="flex items-center gap-2">
          <FaCamera />
          High-definition monitoring
        </li>
        <li className="flex items-center gap-2">
          <FaShare />
          {specificSite.media ? (
            <a
              href={specificSite.media}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Watch Video
            </a>
          ) : (
            "No Media Available"
          )}
        </li>
      </ul>

      {/* Contact Component */}
      <div className="mt-6">
        <Contact listing={specificSite} />
      </div>
    </main>
  );
}
