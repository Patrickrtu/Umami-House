import React from "react";
import { useEffect } from "react";

const Notification = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        console.log('Notification rendered:', { message, isVisible });
      }, [message, isVisible]);
    
      if (!isVisible) return null;
    
      return (
        <div className="notification">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      );
    };

export default Notification;