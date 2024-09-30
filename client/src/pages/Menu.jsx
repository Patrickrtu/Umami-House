import React, { useState, useEffect } from "react";
import '../css/styles.css'
import { getMenuItems } from "../api/GetMenuItems.jsx";

const categories = ['Appetizer', 'Lunch', 'Dinner', 'Sushi', 'Dessert', 'Beverage'];

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        const categorizedItems = categories.reduce((acc, category) => {
          acc[category] = items.filter(item => item.category === category);
          return acc;
        }, {});
        setMenuItems(categorizedItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError('Failed to load menu items.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (isLoading) return <p>Loading menu items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="menu-container">
      <h1 className="page-header">Our Menu</h1>
      {categories.map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="menu-grid">
            {menuItems[category] && menuItems[category].map((item) => (
              <div key={item.itemId} className="menu-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
