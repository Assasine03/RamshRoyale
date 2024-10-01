// Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInAnonymouslyUser } from "../firebase/firebase"; // Import anonymous sign-in function

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("Logged in successfully:", userCredential);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        console.error("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        console.error("User not found");
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  // Anonymous sign-in handler
  const handleAnonymousSignIn = () => {
    signInAnonymouslyUser();
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
