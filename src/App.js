import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PATHS} from './constants';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import NoMatchPage from './routes/NoMatchPage';
import {AuthContextProvider} from './store/auth-context';
import AppStyles from './components/AppStyles';
import RequireAuth from './components/RequireAuth';

const App = () => {
  const {LOGIN_PAGE} = PATHS;

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AppStyles />}>
          <Route
            index
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path={LOGIN_PAGE} element={<LoginPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
