import React, { useState, useEffect, useCallback } from 'react';
import '../css/styles.css'; // Adjust the path as necessary
import { createReservation } from '../api/CreateReservation';
import { getReservations } from '../api/GetReservations';
import { getAvailableTables } from '../api/GetAvailableTables';
import { sendReservationConfirmation, generateConfirmationNumber } from "../components/SendGridEmails";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

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
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [table, setTable] = useState(0);

  const fetchAvailableTables = useCallback(debounce(async (partySize) => {
    try {
      if (isNaN(partySize)) {
        return;
      }

      const table = await getAvailableTables(partySize);

      if (!table) {
        console.log('No available tables');
        return;
      }
    
      setTable(table.tableId);
    } catch (error) {
      console.error('Error fetching available tables:', error);
    }
    // Debouncing with a 500ms delay
  }, 500), []); 

  // Debounce before triggering fetchAvailableTables
  useEffect(() => {
    const partySize = parseInt(formData.partySize, 10);
    fetchAvailableTables(partySize);
  }, [formData.partySize, fetchAvailableTables]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date and time
    if (!formData.date || !formData.time) {
      alert("Please enter both date and time.");
      return;
    }

    // Prepare date and time in the expected formats
    const date = new Date(formData.date);
    const dateString = date.toISOString().split('T')[0] + 'T00:00:00';

    // Ensure time is in 'HH:mm:ss' format
    const timeString = formData.time.length === 5 ? formData.time + ':00' : formData.time;

    // Prepare reservation data matching the API's expected format
    const reservationData = {
      tableId: table, // Or assign a table ID if available
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      partySize: parseInt(formData.partySize, 10),
      date: dateString,
      time: timeString,
      specialRequests: formData.specialRequests || null,
      status: "Pending",
      
      // The server doesn't need these
      // createdAt: new Date().toISOString(),
      // updatedAt: null,
      // table: null, 
    };

    try {
      const response = await createReservation(reservationData);
      console.log("Reservation created:", response);
      await sendReservationConfirmation(reservationData);
      // Handle successful reservation (e.g., show a success message, clear form)
      alert("Reservation created successfully! A confirmation email has been sent to your email address.");
      alert("Reservation created successfully!");
      // Reset form data
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        partySize: "",
        date: "",
        time: "",
        specialRequests: "",
      });
      // Refresh the reservations list
      fetchReservations();
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error creating reservation. Please try again.");
    }
  };

  // Function to fetch reservations
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Failed to load reservations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch reservations on component mount
  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <div className="reservations-container">Loading reservations...</div>;
  }

  if (error) {
    return <div className="reservations-container">{error}</div>;
  }

  return (
    <div className="reservations-container">
      <h1 className="title">Reservations</h1>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Table Number</th>
            <th>Customer Name</th>
            <th>Party Size</th>
            <th>Date &amp; Time</th>
            <th>Status</th>
            <th>Special Requests</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td>{reservation.reservationId}</td>
              <td>{reservation.table ? reservation.table.tableNumber : 'Unassigned'}</td>
              <td>{reservation.customerName}</td>
              <td>{reservation.partySize}</td>
              <td>
                {new Date(reservation.date).toLocaleDateString()}&nbsp;
                {reservation.time}
              </td>
              <td>{reservation.status}</td>
              <td>{reservation.specialRequests || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="title">Make a Reservation</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* Customer Name */}
        <input
          className="input"
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        {/* Customer Email */}
        <input
          className="input"
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        {/* Customer Phone */}
        <input
          className="input"
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        {/* Party Size */}
        <input
          className="input"
          type="number"
          name="partySize"
          value={formData.partySize}
          onChange={handleChange}
          placeholder="Party Size"
          required
          min="1"
        />

        {/* Date */}
        <input
          className="input"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Time */}
        <input
          className="input"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        {/* Special Requests */}
        <input
          className="input"
          type="text"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
        />

        <button className="button" type="submit">
          Make Reservation
        </button>
      </form>
    </div>
  );
}

export default Reservations;
