"use client";
import { createContext, useContext, useState } from "react";

interface ToggleContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isUserMenuOpen: boolean;
  toggleUserMenu: () => void;
  closeUserMenu: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export function ToggleProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  return (
    <ToggleContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isUserMenuOpen,
        toggleUserMenu,
        closeUserMenu,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

export const useToggle = (): ToggleContextType => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
