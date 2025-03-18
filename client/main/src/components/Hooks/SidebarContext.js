// Importing React hooks
import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // State to track the collapsed status of the sidebar
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Function to toggle the sidebar's collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };


  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
        {children}
    </SidebarContext.Provider>
  );
};
