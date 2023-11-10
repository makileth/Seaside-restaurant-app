"use client";
import React, { useState, useEffect } from "react";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Check if window is defined before using it
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY === 0) {
          setShowNotification(true);
        } else {
          setShowNotification(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Function to determine if the viewport is in mobile mode
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  // Define a CSS class for the smooth transition effect.
  const notificationClass = showNotification
    ? "notification-show"
    : "notification-hide";

  return (
    <div className={`notification ${notificationClass}`}>
      {isMobile()
        ? "Free delivery for all orders for the week!"
        : "Free delivery for all orders for the week! Order your piece of Caribbeans now!"}
    </div>
  );
};

export default Notification;
