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
  const [order, setOrder] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    pickupTime: '',
    customerName: '',
    customerPhone: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Failed to load menu items. Try refreshing the page.');
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToOrder = (itemToAdd) => {
    setOrder((currentOrder) => {
      if (!Array.isArray(currentOrder)) {
        console.error('Current order is not an array:', currentOrder);
        return [{ ...itemToAdd, quantity: 1 }];
      }
      const existingItem = currentOrder.find(item => item.itemId === itemToAdd.itemId);
      if (existingItem) {
        return currentOrder.map(item =>
          item.itemId === itemToAdd.itemId ? { ...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...currentOrder, { ...itemToAdd, quantity: 1}];
      }
    });
  };

  const handleRemoveFromOrder = (itemId) => {
    setOrder((currentOrder) => {
      if (!Array.isArray(currentOrder)) {
        console.error('Current order is not an array:', currentOrder);
        return [];
      }
      const updatedOrder = currentOrder.map(item =>
        item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);
      return updatedOrder; 
    });
  };

  const handleOrderDetailsChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!Array.isArray(order) || order.length === 0) {
      setError('Your order is empty. Please add items to your order.');
      return;
    }
    const orderItems = order.map(({ itemId, quantity }) => ({
      menuItemId: itemId,
      quantity,
    }));

    const orderData = {
      orderDate: new Date().toISOString(),
      pickupTime: new Date(orderDetails.pickupTime).toISOString(),
      status: 'Pending',
      totalAmount: calculateTotal(),
      orderItems: orderItems
    };

    try {
      const response = await createTakeoutOrder(orderData);
      console.log('Takeout order created:', response);
      alert('Takeout order placed successfully!');
      setOrder({});
      setOrderDetails({ pickupTime: '', customerName: '', customerPhone: '' });
    } catch (error) {
      console.error('Error creating takeout order:', error);
      setError('Error placing takeout order. Please try again.');
    }
  };

  const calculateTotal = () => {
    if (!Array.isArray(order)) {
      console.error('Order is not an array:', order);
      return 0;
    }
    return order.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TakeoutContainer>
      <Title>Takeout Order</Title>
      <MenuGrid>
        {menuItems.map((item) => (
          <MenuItem key={item.itemId}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <Button onClick={() => handleAddToOrder(item)}>Add to Order</Button>
            {order.find(orderItem => orderItem.itemId === item.itemId) && (
              <>
                <p>Quantity: {order.find(orderItem => orderItem.itemId === item.itemId).quantity}</p>
                <Button onClick={() => handleRemoveFromOrder(item.itemId)}>Remove</Button>
              </>
            )}
          </MenuItem>
        ))}
      </MenuGrid>
      <OrderForm onSubmit={handleSubmitOrder}>
        <h2>Your Order</h2>
        {Array.isArray(order) && order.map((item) => (
            <p key={item.itemId}>
              {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </p>
          ))}
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