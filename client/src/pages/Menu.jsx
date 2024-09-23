import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMenuItems } from "../api/GetMenuItems.jsx";

const MenuContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <MenuContainer>
      <h1>Our Menu</h1>
      <MenuGrid>
        {menuItems.map((item) => (
          <MenuItem key={item.itemID}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </MenuItem>
        ))}
      </MenuGrid>
    </MenuContainer>
  );
}

export default Menu;
