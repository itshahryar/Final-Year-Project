import Anomaly_Details from "../models/Anoamly_Details.js"; 

export const SeeAll = async (req, res) =>{
  const {siteId} = req.body;
  try{
    const AnomalyOfSite = await Anomaly_Details.findOne({siteId});
    // const AnomalyOfSite = await Anomaly_Details.findOne({ siteId: req.query.Site_id });


    if(!AnomalyOfSite){
    return res.status(404).json({ success: false, message: "Anomaly record not found for the specified site." });
    }

    return res.status(200).json({
      success: true,
      message: "Anomaly detection requirements updated successfully.",
      data: AnomalyOfSite,
    });
  }
catch (error) {
  console.error("Error Fetching anomaly:", error);
  return res.status(500).json({
    success: false,
    message: "An error occurred while Fetching anomaly detection requirements.",
  });
}
}

export const UpdateAnomaly = async (req, res) => {
  const { siteId, anomalies } = req.body; // Extract siteId and anomalies from the request body
  try {
    const AnomalyOfSite = await Anomaly_Details.findOne({ siteId });
    if (!AnomalyOfSite) {
      return res.status(404).json({ success: false, message: "Anomaly record not found for the specified site." });
    }

    // Update the detectionRequirements field with the new anomalies
    AnomalyOfSite.detectionRequirements = anomalies;

    // Save the updated anomaly record
    await AnomalyOfSite.save();

    return res.status(200).json({
      success: true,
      message: "Anomaly detection requirements updated successfully.",
      data: AnomalyOfSite,
    });
  } catch (error) {
    console.error("Error updating anomaly:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating anomaly detection requirements.",
    });
  }
};






export const addSupervisor = async (req, res) => {
  console.log("yes we are going to add supervisor");
  try {
    const { name, email, password, phone, alternateContact, siteAssigned, alternateEmail, registeredBy } = req.body;
    console.log(siteAssigned + " is going to be added ");

    // Check if the email is already in use
    const existingSupervisor = await Supervisor.findOne({ email });
    if (existingSupervisor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new supervisor
    const newSupervisor = new Supervisor({
      name,
      email,
      password: hashedPassword, // Store hashed password
      alternateEmail: alternateEmail || "zaminraza095@gmail.com",
      alternateContact: alternateContact || "03367231826", // Default contact if not provided
      registeredBy: registeredBy,
      phone: phone,
      siteAssigned: siteAssigned,
    });

    console.log(newSupervisor.siteAssigned) + "this is my new site";

    // Save the new supervisor to the database
    const savedSupervisor = await newSupervisor.save();



    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zaminraza095@gmail.com',
        pass: 'svtu pbaj nppi ynkf',
      }
    });
  
    var mailOptions = {
      from: 'zaminraza095@gmail.com',
      to: 'zaminraza095@gmail.com',
      subject: 'Your Profile Credentials',
    
    
      // text: `http://localhost:5173/recoverpassword/${encodeURIComponent(token)}`
      text: email + "  " + name + " "
  
    };
    console.log("ye chal raha hai");
    console.log(mailOptions.to)
    console.log(typeof(mailOptions.to))
    
    console.log(mailOptions.text);
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log("mail agyi hogi chala");
        return res.send({Status : "Success"});
      }
    });


    // Update the monitored field of the assigned sites
    await Promise.all(
      siteAssigned.map(async (siteId) => {
        const site = await Site.findById(siteId); // Find the site by ID
        if (site) {
          site.monitored = true; // Update the monitored field
          await site.save(); // Save the changes to the database
        }
      })
    );
    console.log("Supervisor saved successfully:", savedSupervisor);
console.log("Updating site monitored status...");


    
  
    res.status(201).json({ message: "Supervisor added successfully", supervisor: savedSupervisor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the supervisor" });
  }
};

export const suspendSupervisor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the supervisor by ID
    const supervisor = await Supervisor.findById(id);

    

    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    supervisor.status== 'suspended'? supervisor.status = 'active' : supervisor.status = 'suspended' 


    // Save the updated supervisor
    await supervisor.save();

    res.status(200).json({ message: "Supervisor suspended successfully", supervisor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while suspending the supervisor" });
  }
};

// Add (create) a new supervisor
// export const addSupervisor = async (req, res) => {
//   console.log("yes we are going to add supervisor");
//   try {
//     const { name, email, password, phone ,  alternateContact , siteAssigned , alternateEmail , registeredBy} = req.body;
//     console.log(siteAssigned + " is goint to be added ");
//     // Check if the email is already in use
//     const existingSupervisor = await Supervisor.findOne({ email });
//     if (existingSupervisor) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new supervisor with hashed password
//     const newSupervisor = new Supervisor({
//       name,
//       email,
//       password: hashedPassword, // Store hashed password
//       alternateEmail: alternateEmail || "zaminraza095@gmail.com", 
//       alternateContact : alternateContact || "03367231826", // Default role if not provided
//       registeredBy : registeredBy ,
//       phone : phone ,
//       siteAssigned : siteAssigned
//     });

//     console.log(newSupervisor.siteAssigned);

//     // Save the new supervisor to the database
//     const savedSupervisor = await newSupervisor.save();

   



//     res.status(201).json(savedSupervisor); // Respond with the newly created supervisor
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Update an existing supervisor
export const updateSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone ,  alternateContact , siteAssigned , alternateEmail ,} = req.body;

    // Find the existing supervisor by ID
    let supervisor = await Supervisor.findById(id);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    // Hash the password if it's being updated
    let updatedFields = { name, email, phone , alternateContact , siteAssigned , alternateEmail  }; // Fields to update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt); // Hash the new password
    }

    // Update the supervisor
    supervisor = await Supervisor.findByIdAndUpdate(id, updatedFields, { new: true });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zaminraza095@gmail.com',
        pass: 'svtu pbaj nppi ynkf',
      }
    });
  
    var mailOptions = {
      from: 'zaminraza095@gmail.com',
      to: email,
      subject: 'YOUR UPDATED PROFILE CREDENTIALS',
    
   
      text:  supervisor.email + " "  + supervisor.alternateEmail + supervisor.phone
  
    };
    console.log("ye chal raha hai");
    console.log(mailOptions.to)
    console.log(typeof(mailOptions.to))
    
    console.log(mailOptions.text);
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log("mail agyi hogi chala");
        return res.send({Status : "Success"});
      }
    });

    res.status(200).json(supervisor); // Respond with the updated supervisor
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSupervisors = async (req, res) => {
  console.log("AAJ chalny laga hai");
  try {
    const supervisors = await Supervisor.find().populate('siteAssigned') // Fetch all supervisors

    if(supervisors){
        res.status(200).json(supervisors); // Return as JSON response
    }
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific supervisor by ID
export const getSupervisorById = async (req, res) => {
  try {
    const { id } = req.params;
    const supervisor = await Supervisor.findById(id) // Fetch supervisor by ID
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json(supervisor); // Return the specific supervisor
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Delete a supervisor by ID
export const deleteSupervisor = async (req, res) => {
  console.log("Ye chaly ga delete")
  try {
    const { id } = req.params;
    console.log(id)
    const Supervisor_tobe_Deleted = await Supervisor.findById(id);
   
   

    if (Supervisor_tobe_Deleted) {
      Supervisor_tobe_Deleted
      for (const siteId of Supervisor_tobe_Deleted.siteAssigned) {
        const site = await Site.findById(siteId);
        if (site) {
          site.monitored = false;
          await site.save();
        }
      }
    }
    const deletedSupervisor = await Supervisor.findByIdAndDelete(id);
    // Delete supervisor by ID
    if (!deletedSupervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json({ message: "Supervisor deleted successfully" }); // Confirm deletion
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




