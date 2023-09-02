import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  debugger
  const [showMenuItems, setShowMenuItems] = useState(false);

  const toggleMenuItems = () => {
    setShowMenuItems(true);
  };

  return (
    <MenuContext.Provider value={{ showMenuItems, toggleMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
}
