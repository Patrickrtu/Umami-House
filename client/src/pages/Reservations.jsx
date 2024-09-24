import React, { useState } from "react";
import '../css/styles.css';
import { createReservation } from "../api/CreateReservation";
import video from '../assets/nobu_la-540p.mp4';

function Reservations() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    partySize: "",
    date: "",
    time: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createReservation(formData);
      console.log("Reservation created:", response);
      // Handle successful reservation (e.g., show a success message, clear form)
      alert("Reservation created successfully!");
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        partySize: "",
        date: "",
        time: "",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error (e.g., show error message to user)
      alert("Error creating reservation. Please try again.");
    }
  };

  return (
      <div className="reservations-container">
      <video className="video-background" src={video} autoPlay loop muted></video>
      <h1 className="title">Make a Reservation</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          className="input"
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="input"
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <select
          name="partySize"
          value={formData.partySize}
          onChange={handleChange}
          required
        >
          <option value="">Select Party Size</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
            <option key={size} value={size}>
              {size} {size === 1 ? "person" : "people"}
            </option>
          ))}
        </select>
        <input
          className="input"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
        />
        <button className="button" type="submit">Make Reservation</button>
        </form>
    </div>
  );
}

export default Reservations;
