// import React, { useState } from 'react';
// import { Link, useNavigate , useParams } from 'react-router-dom';
// import axios from 'axios';

// const Forgot2 = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   // const {id,token} = useParams();
//   const {id} = useParams();

//   // console.log(id + "dsadas" + token);
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // const response = await axios.post(`http://localhost:5000/login/PasswordChange/${id}/${token}`, { email });
//       const response = await axios.post(`http://localhost:5000/login/PasswordChange/${id}/`, { password });

//       console.log("bs qareeb hain");

      
//         navigate('/login');
      
   

//     } catch (error) {
//       console.error('Login error:', error);
//       alert('An error occurred during login.');
//     }
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       textAlign: 'center',
//       height: '100vh',
//       backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"
//     }}>
//       <div style={{
//         background: 'white',
//         padding: '20px',
//         borderRadius: '10px',
//         width: '40%'
//       }}>
//         <h2 className='mb-3 text-primary'>RECOVER Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3 text-start">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="form-control"
//               id="exampleInputEmail1"
//               onChange={(event) => setPassword(event.target.value)}
//               required
//             />
//           </div>
         
//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>
//         <p className='container my-2'>Don&apos;t have an account?</p>
//         <Link to='/register' className="btn btn-secondary">Register</Link>
//       </div>
//     </div>
//   );
// }

// export default Forgot2;

import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NewHeader from "../components/NewHeader";
import { FiLock } from "react-icons/fi";

const Forgot2 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/login/PasswordChange/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to reset password. Try again.");
        setLoading(false);
        return;
      }

      setSuccess("Password updated successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <NewHeader /> {/* Add NewHeader component here */}

      <div className="p-3 max-w-lg mx-auto">
        {/* Icon and Title */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <FiLock size={40} className="text-[#FBB911]" />
          <h1 className="text-3xl font-semibold">Reset Password</h1>
        </div>

        <p className="text-center text-gray-600 mb-5">
          Enter your new password below to reset your account password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password*"
            className="border p-3 rounded-lg hover:border-[#FBB911] focus:border-[#FBB911]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password*"
            className="border p-3 rounded-lg hover:border-[#FBB911] focus:border-[#FBB911]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white p-3 rounded-lg uppercase hover:bg-yellow-600 disabled:bg-yellow-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Forgot2;
