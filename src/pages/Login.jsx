// components/Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  signInWithEmailPassword,
  signInAnonymouslyUser,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

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
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle email/password login
  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailPassword(
        data.email,
        data.password
      );
      console.log("Logged in successfully:", userCredential);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error during email sign in:", error);
    }
  };

  // Handle anonymous sign-in
  const handleAnonymousSignIn = async () => {
    try {
      const userCredential = await signInAnonymouslyUser();
      console.log("Logged in anonymously:", userCredential);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error during anonymous sign in:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>

      <hr />

      <h2>Or Sign In Anonymously</h2>
      <button onClick={handleAnonymousSignIn}>Sign in Anonymously</button>
    </div>
  );
};

export default Login;
