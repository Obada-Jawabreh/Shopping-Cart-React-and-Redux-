// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/register/user",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       setSuccess("Registration successful!");
//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         role: "user",
//       });
//       navigate("/products");
//     } catch (err) {
//       setError(err.response.data.error || "Error registering user");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//           Create an Account
//         </h2>
//         {error && <p className="text-red-600 mb-4">{error}</p>}
//         {success && <p className="text-green-600 mb-4">{success}</p>}
//         <form onSubmit={handleRegister}>
//           <div className="mb-5">
//             <label
//               htmlFor="username"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="password"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="role"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Register
//           </button>
//         </form>
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Already have an account?{" "}
//             <a href="/" className="text-blue-600 hover:underline">
//               Login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser()).then(() => {
      navigate('/products');
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Create an Account
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

