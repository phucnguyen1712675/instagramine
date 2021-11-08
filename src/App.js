// import React from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import UserMenu from './components/UserMenu';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Sidebar />
      <MainContent />
      <UserMenu />
    </div>
  );
};

export default App;
