// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Forgot1 = () => {
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//         console.log(email);
//       const response = await axios.post(`http://localhost:5000/login/forget`, { email });
     
//       // Handle success response here (e.g., navigate to another page or show success message)
//     } catch (error) {
//       console.error('Error during password recovery:', error);
//       alert('An error occurred during password recovery.');
//     }
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         textAlign: 'center',
//         height: '100vh',
//         backgroundImage: 'linear-gradient(#00d5ff, #0095ff, rgba(93, 0, 255, .555))'
//       }}
//     >
//       <div
//         style={{
//           background: 'white',
//           padding: '20px',
//           borderRadius: '10px',
//           width: '40%'
//         }}
//       >
//         <h2 className='mb-3 text-primary'>Forgot Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3 text-start">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               <strong>Email Id</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter an Email"
//               className="form-control"
//               id="exampleInputEmail1"
//               onChange={(event) => setEmail(event.target.value)}
//               required
//             />
//              <button type="submit" className="btn btn-secondary">Submit</button>
//           </div>
         
//         </form>
//         <p className='container my-2'>Don't have an account?</p>
//         <Link to='/register' className="btn btn-secondary">Register</Link>
//       </div>
//     </div>
//   );
// };

// export default Forgot1;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewHeader from "../components/NewHeader";
import { FiMail } from "react-icons/fi";

const Forgot1 = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/login/forget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to send reset link. Try again.");
        setLoading(false);
        return;
      }

      setSuccess("Password reset link sent to your email!");
      setLoading(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <NewHeader /> {/* Add NewHeader component here */}

      <div className="p-3 max-w-lg mx-auto">
        {/* Icon */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <FiMail size={40} className="text-[#FBB911]" />
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
        </div>

        <p className="text-center text-gray-600 mb-5">
          Don’t worry! Enter your email, and we’ll help you reset your password.
        </p>

        {/* Input and Button */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email*"
            className="border p-3 rounded-lg hover:border-1 hover:border-[#FBB911] focus:border-1 focus:border-[#FBB911]"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-500 text-white p-3 rounded-lg uppercase hover:bg-yellow-600 disabled:bg-yellow-300"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>

      </div>

    </div>
  );
};

export default Forgot1;