import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PATHS} from './constants';
import {AuthContextProvider} from './store/auth-context';
import LoginPage from './routes/LoginPage';
import SignUpPage from './routes/SignUpPage';
import NoMatchPage from './routes/NoMatchPage';
import HomeContent from './routes/HomeContent';
import InboxContent from './routes/InboxContent';
import ExploreContent from './routes/ExploreContent';
import ActivityContent from './routes/ActivityContent';
import ReelContent from './routes/ReelContent';
import StreamContent from './routes/StreamContent';
import SavedContent from './routes/SavedContent';
import AppStyles from './components/AppStyles';
import RequireAuth from './components/RequireAuth';
import ProtectedRoute from './components/ProtectedRoute';
import HomeLayout from './components/HomeLayout';

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AppStyles />}>
          <Route
            element={
              <RequireAuth>
                <HomeLayout />
              </RequireAuth>
            }
          >
            <Route index element={<HomeContent />} />
            <Route path={PATHS.INBOX} element={<InboxContent />} />
            <Route path={PATHS.EXPLORE} element={<ExploreContent />} />
            <Route path={PATHS.ACTIVITY} element={<ActivityContent />} />
            <Route path={PATHS.REEL} element={<ReelContent />} />
            <Route path={PATHS.STREAM} element={<StreamContent />} />
            <Route path={PATHS.SAVED} element={<SavedContent />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={PATHS.LOGIN} element={<LoginPage />} />
            <Route path={PATHS.SIGNUP} element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
