import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import Takeout from '../pages/Takeout';
import { matchPath } from "react-router-dom";

const mock = new MockAdapter(axios);

describe('Takeout Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('renders Takeout Order title', () => {
    render(<Takeout />);
    expect(screen.getByText('Takeout Order')).toBeInTheDocument();
  });

  it('fetches and displays menu items', async () => {
    const mockMenuItems = [
      { itemId: 1, name: 'Sushi', price: 10, description: 'Fresh sushi' },
      { itemId: 2, name: 'Ramen', price: 12, description: 'Hot ramen' },
    ];

    mock.onGet('http://localhost:5016/api/MenuItems').reply(200, mockMenuItems);

    render(<Takeout />);

    await waitFor(() => {
      expect(screen.getByText('Sushi')).toBeInTheDocument();
      expect(screen.getByText('Ramen')).toBeInTheDocument();
    });
  });

  it('adds item to order when "Add to Order" is clicked', async () => {
    const mockMenuItems = [
      { itemId: 1, name: 'Sushi', price: 10, description: 'Fresh sushi' },
    ];

    mock.onGet('http://localhost:5016/api/MenuItems').reply(200, mockMenuItems);

    render(<Takeout />);

    await waitFor(() => {
      const addButton = screen.getByText('Add to Order');
      userEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Sushi x 1 - $10.00')).toBeInTheDocument();
    });
  });
});
