import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className={styles.bodyContainer}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={styles.mainContent} id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
