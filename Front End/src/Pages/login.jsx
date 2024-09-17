// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
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

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/login/user",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       setSuccess("Logged in successfully!");
//       setFormData({
//         email: "",
//         password: "",
//       });
//       navigate("/products");
//     } catch (err) {
//       setError(err.response.data.message || "Error logging in");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {success && <p className="text-green-500 mb-4">{success}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 p-2 border rounded w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 p-2 border rounded w-full"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded"
//           >
//             Login
//           </button>
//         </form>
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <a href="/register" className="text-blue-600 hover:underline">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUser } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // تسجيل الدخول
      const result = await dispatch(loginUser(formData)).unwrap();
      
      // إذا كان تسجيل الدخول ناجحًا
      if (result) {
        // استرجاع بيانات المستخدم بعد تسجيل الدخول
        await dispatch(fetchUser()).unwrap();
        
        // التنقل إلى صفحة المنتجات
        navigate("/products");
      }
    } catch (error) {
      console.log("Login failed:", error.message || error);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
