import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const getUser = async (req, res) => {
  
  console.log("items get hony waly")
  try {
    const items = await User.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching Users:', error);
    res.status(500).json({ message: 'Error fetching Users', error });
  }
};

export const register = async (req, res) => {
  console.log("reg hony lga");
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, role: user.role, userId: user._id , 
       userName : user.
      username});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
export const forget = async (req,res)=>{
  console.log("chala")
  const{email} = req.body;
  const requser = await User.findOne({email:email});

  

  if (!requser) {
    console.log("nahi milla email");
    return res.status(404).json({ message: 'Invalid Email' });
  }
  console.log(requser._id);
  const token = jwt.sign({userId : requser._id } , SECRET_KEY , {expiresIn : '1d'});
  console.log("token bna");
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
    subject: 'Recover Password ',
  
  
    text: `http://localhost:3000/reset_password/${requser._id}/${token}`

  };
  
  console.log(mailOptions.text);
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("mail agyi hogi chala");
      return res.send({Status : "Success"});
    }
  });
}

export const forget2 = (req, res) => {
  const { email } = req.body;
  const { id, token } = req.params;

  


  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "error with token" });
    } else {
      bcrypt.hash(email, 10)
        .then(hash => {
          User.findByIdAndUpdate(id, { password:hash })
            .then((u) => {
              console.log("hn controller ka function to chal rhaa");
              res.send({ Status: "Success" })})
            .catch(err => res.send({ Status: err }));
        })
        .catch(err => res.send({ Status: err }));
    }
  });
};

export const forget3 = async (req, res) => {
  const { email } = req.body;
  const { id, token } = req.params;

  console.log("Controller function is running");

  try {
    const decoded = jwt.verify(token, "jwt_secret_key");
    console.log("Token verified, decoding result:", decoded);

    const hash = await bcrypt.hash(email, 10);
    console.log("Email hashed successfully:", hash);

    const updatedUser = await User.findByIdAndUpdate(id, { password: hash });
    if (updatedUser) {
      console.log("User found and updated:", updatedUser);
      res.send({ Status: "Success" });
    } else {
      console.log("No user found with the given ID");
      res.json({ Status: "No user found" });
    }
  } catch (err) {
    console.log("Error:", err);
    res.json({ Status: err.message || "error with token" });
  }
};

export const forget4 = async(req,res)=>{
  const{id,token} = req.params
  const {email} = req.body

  const user = await User.findOne({_id : id})

  if(!user){
    console.log("nahi milla");
  }

  const hash = await bcrypt.hash(email, 12);
  console.log(email);
  console.log(hash);

  user.password = hash;

  user.save();


  
}

export const complaint = async (req, res)=>{
  console.log("controller function chal gya")
const{subject , complaint} = req.body
const {id} =  req.params

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
  subject: subject,


  text: complaint

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.send({"Status": "failed"})
    console.log(error);
  } else {
    console.log("mail agyi hogi chala");
    return res.send({Status : "Success"});
  }
});








}