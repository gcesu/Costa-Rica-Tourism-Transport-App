import React, { createContext, useContext, useState } from 'react';
import { mockBookings } from '../data/mockData';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(mockBookings);

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      assignedDriver: null
    };

    setBookings(prev => [...prev, newBooking]);
    return { success: true, booking: newBooking };
  };

  const updateBooking = (bookingId, updates) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, ...updates }
          : booking
      )
    );
  };

  const assignDriver = (bookingId, driverId) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, assignedDriver: driverId, status: 'assigned' }
          : booking
      )
    );
  };

  const getBookingsByUser = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getBookingsByDriver = (driverId) => {
    return bookings.filter(booking => booking.assignedDriver === driverId);
  };

  const value = {
    bookings,
    createBooking,
    updateBooking,
    assignDriver,
    getBookingsByUser,
    getBookingsByDriver
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};