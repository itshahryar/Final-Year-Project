import Site from "../models/Site.js"; 
import Supervisor from "../models/Supervisor.js";
import Anomaly_Details from "../models/Anoamly_Details.js";


// export const addSite = async (req, res) => {
//     console.log("add site hony lagi")
//   try {
//     // Extract data from formData
//     const { siteId, siteName, address, city, Sensitivity } = req.body.formData;

//     // Check if the SiteID already exists
//     const existingSite = await Site.findOne({ SiteID: siteId });
//     if (existingSite) {
//       return res.status(400).json({ message: "SiteID already exists" });
//     }

//     // Create a new Site document
//     const newSite = new Site({
//       SiteID: siteId,
//       SiteName: siteName,
//       SiteAddresss: address,
//       City: city,
//       Sensitivity, // Use the provided Sensitivity or default value
//     });

//     // Save the new Site to the database
//     const savedSite = await newSite.save();

//     CreateAnomaly(siteId);

//     // Respond with the newly created Site
//     res.status(201).json(savedSite);
//   } catch (err) {
//     // Handle any errors that occur during the process
//     res.status(500).json({ message: err.message });
//   }
// };


export const addSite = async (req, res) => {
  console.log("Adding a new site...");

  try {
    // Extract data from req.body.formData
    const { siteId, siteName, address, city, Sensitivity } = req.body.formData;

    // Check if the SiteID already exists
    const existingSite = await Site.findOne({ SiteID: siteId });
    if (existingSite) {
      return res.status(400).json({ message: "SiteID already exists" });
    }

    // Create a new Site document
    const newSite = new Site({
      SiteID: siteId,
      SiteName: siteName,
      SiteAddresss: address,
      City: city,
      Sensitivity, // Use the provided Sensitivity or default value
    });

    // Save the new Site to the database
    const savedSite = await newSite.save();

    // Use the _id of the saved site to create an anomaly record
    const anomalyResponse = await CreateAnomaly(savedSite._id);

    if (!anomalyResponse.success) {
      return res.status(400).json({ message: anomalyResponse.message });
    }
    console.log("site created");

    // Respond with the newly created Site and anomaly information
    res.status(201).json({
      message: "Site and anomaly record created successfully",
      site: savedSite,
      anomaly: anomalyResponse.data,
    });
  } catch (err) {
    console.error("Error adding site:", err);
    res.status(500).json({ message: err.message });
  }
};

export const CreateAnomaly = async (siteId) => {
  try {
    // Check if an anomaly record already exists for the site
    const existingAnomaly = await Anomaly_Details.findOne({ siteId });
    if (existingAnomaly) {
      return {
        success: false,
        message: "Anomaly record already exists for this site.",
      };
    }

    // Create a new anomaly record with default detection requirements
    const newAnomaly = new Anomaly_Details({
      siteId,
      detectionRequirements: {
        helmet: true,
        vest: true,
        max_persons: 4,
        gloves: false,
        safetyBoots: false,
        faceShield: false,
        otherPPE: false,
      },
    });

    // Save the anomaly record to the database
    await newAnomaly.save();

    return {
      success: true,
      message: "Anomaly record created successfully.",
      data: newAnomaly,
    };
  } catch (error) {
    console.error("Error creating anomaly record:", error);
    return {
      success: false,
      message: "An error occurred while creating the anomaly record.",
    };
  }
};


 // Adjust the path based on your project structure



// export const CreateAnomaly = async (siteId) => {
//   // const { siteId } = req.body;

//   console.log("SIte Add k sath anomaly add hony lagi")

//   try {
//     // Check if an anomaly record already exists for the site
//     const existingAnomaly = await Anomaly_Details.findOne({ siteId });
//     if (existingAnomaly) {
//       return res.status(400).json({
//         success: false,
//         message: "Anomaly record already exists for this site.",
//       });
//     }

//     // Create a new anomaly record with default detection requirements
//     const newAnomaly = new Anomaly_Details({
//       siteId,
//       detectionRequirements: {
//         helmet: true,
//         vest: true,
//         max_persons: 4,
//         gloves: false,
//         safetyBoots: false,
//         faceShield: false,
//         otherPPE: false,
//       },
//     });

//     // Save the anomaly record to the database
//     await newAnomaly.save();

//     return res.status(201).json({
//       success: true,
//       message: "Anomaly record created successfully.",
//       data: newAnomaly,
//     });
//   } catch (error) {
//     console.error("Error creating anomaly record:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the anomaly record.",
//     });
//   }
// };



// Update an existing supervisor
// export const updateSupervisor = async (req, res) => {
//   try {
//     const { id } = req.params;
//  // Extract data from formData
//  const { siteId, siteName, address, city, Sensitivity } = req.body.formData;

//     // Find the existing supervisor by ID
//     let site = await Site.findById(id);
//     if (!site) {
//       return res.status(404).json({ message: "No Site founded" });
//     }

//     // Hash the password if it's being updated
//     let updatedFields = { name, email, phone , alternateContact , siteAssigned , alternateEmail  }; // Fields to update
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       updatedFields.password = await bcrypt.hash(password, salt); // Hash the new password
//     }

//     // Update the supervisor
//     supervisor = await Supervisor.findByIdAndUpdate(id, updatedFields, { new: true });

//     res.status(200).json(supervisor); // Respond with the updated supervisor
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const updateSite = async (req, res) => {
  console.log("hn ye wali upadte ho jaye gi")
  const { id } = req.params; // Extract the site ID from the request parameters
  const { Sensitivity, Active } = req.body; // Extract the fields to update from the request body

  try {
    // Find the site by ID and update the specified fields
    const updatedSite = await Site.findOneAndUpdate(
      { _id: id }, // Query by SiteID
      { Sensitivity, Active }, // Fields to update
      { new: true } // Return the updated document
    );

    // If the site is not found, return a 404 error
    if (!updatedSite) {
      return res.status(404).json({ message: "Site not found" });
    }

    // Return the updated site data
    res.status(200).json(updatedSite);
  } catch (error) {
    // Handle errors
    console.error("Error updating site:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const SetActive = async (req, res) => {
  try {
    const { UserId, siteId , flag } = req.body;

    // Find the supervisor and populate the siteAssigned array
    const supervisor = await Supervisor.findById(UserId).populate('siteAssigned');

    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // // Deactivate all sites
    // for (const site of supervisor.siteAssigned) {
    //   await Site.findByIdAndUpdate(site._id, { Active: false });
    // }

    // Activate the specified site
    
    const updatedSite = await Site.findByIdAndUpdate(siteId, { Active: flag }, { new: true });
    if (!updatedSite) {
      return res.status(404).json({ message: "Site not found" });
    }

    return res.status(200).json({ message: "Active site updated successfully", updatedSite });
  } catch (error) {
    console.error("Error in SetActive:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllSites = async (req, res) => {
  console.log("AAJ chalny laga hai all sites wala route");
  try {
    const sites = await Site.find(); // Fetch all supervisors

    if(sites){
        res.status(200).json(sites); // Return as JSON response
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const myAllsites = async (req, res) => {
  try {
    const { UserId } = req.params; // Fix the destructuring
    console.log(UserId);

    // Find the supervisor by ID and populate the siteAssigned field
    const mySupervisor = await Supervisor.findById(UserId).populate('siteAssigned');

    if (mySupervisor) {
      const mySites = mySupervisor.siteAssigned;
      return res.status(200).json(mySites); // Respond with the sites
    } else {
      return res.status(404).json({ message: "Supervisor not found" }); // Handle case where supervisor doesn't exist
    }
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).json({ message: "Server error", error }); // Handle server errors
  }
};

export const SpecificSite = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the site by its ID
    const specific_Site = await Site.findById(id);

    // If the site is not found, return a 404 status
    if (!specific_Site) {
      return res.status(404).json({ message: "Site not found" });
    }

    // If the site is found, return it with a 200 status
    return res.status(200).json(specific_Site);
  } catch (error) {
    // Handle any errors, such as invalid IDs or server issues
    console.error("Error fetching specific site:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// // Get a specific supervisor by ID
// export const getSupervisorById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const supervisor = await Supervisor.findById(id); // Fetch supervisor by ID
//     if (!supervisor) {
//       return res.status(404).json({ message: "Supervisor not found" });
//     }
//     res.status(200).json(supervisor); // Return the specific supervisor
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// // Delete a supervisor by ID
// export const deleteSupervisor = async (req, res) => {
//   console.log("Ye chaly ga delete")
//   try {
//     const { id } = req.params;
//     console.log(id)
//     const deletedSupervisor = await Supervisor.findByIdAndDelete(id); // Delete supervisor by ID
//     if (!deletedSupervisor) {
//       return res.status(404).json({ message: "Supervisor not found" });
//     }
//     res.status(200).json({ message: "Supervisor deleted successfully" }); // Confirm deletion
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




