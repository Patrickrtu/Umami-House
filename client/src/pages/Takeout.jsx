import React, { useState, useEffect, useMemo } from 'react';
import '../css/styles.css'
import { getMenuItems } from '../api/GetMenuItems';
import { createTakeoutOrder } from '../api/CreateTakeoutOrder';

const California_Tax_Rate = 0.0725;

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

  const calculateSubtotal = useMemo(() => {
    if (!Array.isArray(order)) {
      console.error('Order is not an array:', order);
      return 0;
    }
    return order.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [order]);

  const tax = useMemo(() => calculateSubtotal * California_Tax_Rate, [calculateSubtotal]);
  const total = useMemo(() => calculateSubtotal + tax, [calculateSubtotal, tax]);

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
      totalAmount: total(),
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="takeout-container">
      <h1 className="title">Takeout Order</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.itemId} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button className="button" onClick={() => handleAddToOrder(item)}>Add to Order</button>
            {order.find(orderItem => orderItem.itemId === item.itemId) && (
              <>
                <p>Quantity: {order.find(orderItem => orderItem.itemId === item.itemId).quantity}</p>
                <button className="button" onClick={() => handleRemoveFromOrder(item.itemId)}>Remove</button>
              </>
            )}
          </div>
        ))}
      </div>
      <form className="order-form" onSubmit={handleSubmitOrder}>
        <h2>Your Order</h2>
        {Array.isArray(order) && order.map((item) => (
            <p key={item.itemId}>
              {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </p>
          ))}
        <p>Subtotal: ${calculateSubtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <input
          className="input"
          type="datetime-local"
          name="pickupTime"
          value={orderDetails.pickupTime}
          onChange={handleOrderDetailsChange}
          required
        />
        <input
          className="input"
          type="text"
          name="customerName"
          value={orderDetails.customerName}
          onChange={handleOrderDetailsChange}
          placeholder="Your Name"
          required
        />
        <input
          className="input"
          type="tel"
          name="customerPhone"
          value={orderDetails.customerPhone}
          onChange={handleOrderDetailsChange}
          placeholder="Phone Number"
          required
        />
        <button className="button" type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Takeout;