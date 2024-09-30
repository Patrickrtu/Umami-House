import React, { useState } from 'react';
import { deleteReservation } from '../api/DeleteReservation';
import '../css/styles.css';

export default function DeleteReservation() {
  const [reservationId, setReservationId] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setReservationId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError(null);
    setSuccessMessage(null);

    if (!reservationId) {
      setError('Please enter a reservation ID.');
      return;
    }

    try {
      setDeleting(true);
      await deleteReservation(reservationId);
      setSuccessMessage('Reservation deleted successfully');
      setReservationId(''); // Clear the input field
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('Error deleting reservation');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="delete-reservation-content">
      <h2>Delete Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reservationId">Reservation ID:</label>
          <input
            type="number"
            id="reservationId"
            name="reservationId"
            value={reservationId}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="button-container">
          <button type="submit" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete Reservation'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

