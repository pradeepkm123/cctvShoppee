import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistCount(wishlist.length);
  }, []);

  const updateWishlistCount = (count) => {
    setWishlistCount(count);
  };

  return (
    <WishlistContext.Provider value={{ wishlistCount, updateWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};
