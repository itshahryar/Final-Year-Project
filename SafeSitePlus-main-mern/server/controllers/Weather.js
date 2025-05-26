// Import fetch (use this for Node.js)
import fetch from 'node-fetch';

 

export const getAllWeatherData = async (req, res) => {
    console.log("ye chala");

    // const api_key = ee00048a45914954872163634242310;
    const city = 'London'; // Fetch from query or params
    const url =  'http://api.weatherapi.com/v1/current.json?key=ee00048a45914954872163634242310&q=London'


  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const weatherData = await response.json(); // Parse the JSON from the response

    return res.status(200).json(weatherData); // Return data as a JSON response
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 
