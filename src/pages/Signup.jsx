import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { FaGoogle, FaYahoo, FaPhoneAlt } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import {
  SiApple,
  SiFacebook,
  SiGoogleplay,
  SiX,
  SiGithub,
  SiMicrosoft,
} from "react-icons/si";

// Validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle sign-up
  const onSubmit = async (data) => {
    try {
      console.log("Signed up successfully:", data);
      navigate("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md shadow-lg rounded-lg p-8">
        <h2 className="text-5xl text-casinoGold mb-8 font-pixel text-center">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-col-1 gap-3"
        >
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2"
          >
            Sign Up
          </button>

          <div className="text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Log In
            </Link>
          </div>
        </form>

        {/* Button container */}
        <div className="flex justify-center   w-full">
          <button
            onClick={() => console.log("Anonymous sign-in")}
            className="text-sm font-pixel bg-gray-500 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md"
          >
            <IoPersonCircleSharp size={24} />
          </button>

          <button className="text-sm font-pixel bg-blue-600 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <FaPhoneAlt size={24} />
          </button>

          <button className="text-sm font-pixel bg-red-500 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <FaGoogle size={24} />
          </button>

          <button className="text-sm font-pixel bg-black text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <SiApple size={24} />
          </button>

          <button className="text-sm font-pixel bg-blue-700 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <SiFacebook size={24} />
          </button>

          <button className="text-sm font-pixel bg-green-600 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <SiGoogleplay size={24} />
          </button>

          <button className="text-sm font-pixel bg-red-600 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <SiX size={24} />
          </button>

          <button className="text-sm font-pixel bg-gray-800 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <SiGithub size={24} />
          </button>

          <button className="text-sm font-pixel bg-blue-900 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <SiMicrosoft size={24} />
          </button>

          <button className="text-sm font-pixel bg-purple-600 text-white border-4 border-dashed border-white font-bold uppercase flex justify-center items-center w-16 h-10 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md">
            <FaYahoo size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
