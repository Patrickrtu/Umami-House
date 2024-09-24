import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMenuItems } from "../api/GetMenuItems.jsx";
import video from '../assets/nobu_la-540p.mp4';


const MenuContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const CategorySection = styled.div`
  margin-bottom:2rem;
`;

const CategoryTitle = styled.h2`
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const MenuGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

const MenuItem = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
`;

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
      <MenuContainer>
        <VideoBackground src={video} autoPlay loop muted></VideoBackground>
          <h1>Our Menu</h1>
          {categories.map(category => (
            <CategorySection key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              <MenuGrid>
            {menuItems[category] && menuItems[category].map((item) => (
              <MenuItem key={item.itemID}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price.toFixed(2)}</p>
              </MenuItem>
            ))}
          </MenuGrid>
            </CategorySection>
          ))}
    </MenuContainer>
  );
}

export default Menu;
