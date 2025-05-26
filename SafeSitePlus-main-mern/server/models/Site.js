import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema(
  {
    SiteID: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      unique: true 
    },
    SiteName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        unique: true 
      },
   
    SiteAddresss: {
      type: String,
      required: true, 
      maxlength: 100// Supervisor should be assigned to a construction site
    },
   City:{
    type: String , 
    maxlength: 100
   },
   monitored: {
    type: Boolean,
    default: false,
  },

  Active:{
    type: Boolean,
    default : false
  } ,

    Sensitivity: {
      type: String,
      default: "Medium",
      enum: ["Low", "Medium", "High"], 
    },
   
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

const Site = mongoose.model("Site", SiteSchema);
export default Site;

