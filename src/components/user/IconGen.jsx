import React, { useState, useEffect, useRef } from "react";
import * as jdenticon from "jdenticon"; // Correct named import for Jdenticon
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Import Firebase authentication

const ProfileIcon = ({ size = 100, clickable = false, onClick = () => {} }) => {
  const [user, setUser] = useState(null);
  const iconRef = useRef(null); // Reference for the Jdenticon

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the Firebase user object
      } else {
        setUser(null); // No user logged in
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Generate Jdenticon when user is available
  useEffect(() => {
    if (iconRef.current && user) {
      const identifier = user.displayName || user.email || user.uid; // Use display name, email, or uid
      jdenticon.update(iconRef.current, identifier);
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your profile icon.</div>;
  }

  return (
    <div
      className={`profile-icon-wrapper ${clickable ? "cursor-pointer" : ""}`}
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%", // Circle shape
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        border: "4px solid white",
      }}
      onClick={clickable ? onClick : null}
    >
      {/* Jdenticon SVG will be rendered here */}
      <svg
        ref={iconRef}
        width={size}
        height={size}
        data-jdenticon-hash={user.uid} // Use user UID for the hash
      />
    </div>
  );
};

export default ProfileIcon;
