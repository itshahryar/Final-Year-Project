import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SupervisorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },

   
    siteAssigned: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Site', // The name of the model you are referencing
      }
    ],
    phone: {
      type: String,
      maxlength: 20, // Optional phone number
    },
    alternateContact:{
        type: String,
        maxlength: 20,
    },
    alternateEmail:{
        type:String,
        required: true
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "suspended"], // Track supervisor's status
    },
   
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

const Supervisor = mongoose.model("Supervisor", SupervisorSchema);
export default Supervisor;
