import React, { createContext, useContext, useState ,useEffect} from 'react';

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [showMenuItems, setShowMenuItems] = useState(false);
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if (currentPath === '/company-dashboard') {
      setShowMenuItems(true);
    } else {
      setShowMenuItems(false);
    }
  }, []);
  const toggleMenuItems = () => {
    setShowMenuItems(!showMenuItems);
  };

  return (
    <MenuContext.Provider value={{ showMenuItems, toggleMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
}
