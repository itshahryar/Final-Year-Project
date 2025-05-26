import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    name: {
      type: String,
      required: true,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
   
   
}

);

const Admin_SafeSite = mongoose.model("Admin_SafeSite", AdminSchema);
export default Admin_SafeSite;