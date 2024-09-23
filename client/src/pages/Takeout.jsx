import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMenuItems } from '../api/GetMenuItems';
import { createTakeoutOrder } from '../api/CreateTakeoutOrder';

const TakeoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MenuItem = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
`;

const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
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

function Takeout() {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    pickupTime: '',
    customerName: '',
    customerPhone: '',
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToOrder = (itemId) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [itemId]: (prevOrder[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromOrder = (itemId) => {
    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder };
      if (newOrder[itemId] > 1) {
        newOrder[itemId]--;
      } else {
        delete newOrder[itemId];
      }
      return newOrder;
    });
  };

  const handleOrderDetailsChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const orderItems = Object.entries(order).map(([itemId, quantity]) => ({
      menuItemId: parseInt(itemId),
      quantity,
    }));

    const orderData = {
      ...orderDetails,
      orderItems,
      totalAmount: calculateTotal(),
    };

    try {
      const response = await createTakeoutOrder(orderData);
      console.log('Takeout order created:', response);
      alert('Takeout order placed successfully!');
      setOrder({});
      setOrderDetails({ pickupTime: '', customerName: '', customerPhone: '' });
    } catch (error) {
      console.error('Error creating takeout order:', error);
      alert('Error placing takeout order. Please try again.');
    }
  };

  const calculateTotal = () => {
    return Object.entries(order).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find((item) => item.itemID === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  return (
    <TakeoutContainer>
      <Title>Takeout Order</Title>
      <MenuGrid>
        {menuItems.map((item) => (
          <MenuItem key={item.itemID}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <Button onClick={() => handleAddToOrder(item.itemID)}>Add to Order</Button>
            {order[item.itemID] && (
              <>
                <p>Quantity: {order[item.itemID]}</p>
                <Button onClick={() => handleRemoveFromOrder(item.itemID)}>Remove</Button>
              </>
            )}
          </MenuItem>
        ))}
      </MenuGrid>
      <OrderForm onSubmit={handleSubmitOrder}>
        <h2>Your Order</h2>
        {Object.entries(order).map(([itemId, quantity]) => {
          const item = menuItems.find((item) => item.itemID === parseInt(itemId));
          return item ? (
            <p key={itemId}>
              {item.name} x {quantity} - ${(item.price * quantity).toFixed(2)}
            </p>
          ) : null;
        })}
        <p>Total: ${calculateTotal().toFixed(2)}</p>
        <Input
          type="datetime-local"
          name="pickupTime"
          value={orderDetails.pickupTime}
          onChange={handleOrderDetailsChange}
          required
        />
        <Input
          type="text"
          name="customerName"
          value={orderDetails.customerName}
          onChange={handleOrderDetailsChange}
          placeholder="Your Name"
          required
        />
        <Input
          type="tel"
          name="customerPhone"
          value={orderDetails.customerPhone}
          onChange={handleOrderDetailsChange}
          placeholder="Phone Number"
          required
        />
        <Button type="submit">Place Order</Button>
      </OrderForm>
    </TakeoutContainer>
  );
}

export default Takeout;