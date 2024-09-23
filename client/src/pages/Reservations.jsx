import React, { useState } from "react";
import styled from "styled-components";
import { createReservation } from "../api/CreateReservation";

const ReservationsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

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
    <ReservationsContainer>
      <Title>Make a Reservation</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <Input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="tel"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <Select
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
        </Select>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
        />
        <Button type="submit">Make Reservation</Button>
      </Form>
    </ReservationsContainer>
  );
}

export default Reservations;
