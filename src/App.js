import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {ROUTE_PATHS} from './constants';
import {
  LoginPage,
  SignUpPage,
  NoMatchPage,
  HomeContent,
  InboxContent,
  ExploreContent,
  ActivityContent,
  ReelContent,
  StreamContent,
  SavedContent,
} from './routes';
import {AppEntry, RequireAuth, ProtectedRoute, HomeLayout} from './components';
import {AuthContextProvider} from './store/authContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AppEntry />}>
          <Route
            element={
              <RequireAuth>
                <HomeLayout />
              </RequireAuth>
            }
          >
            <Route index element={<HomeContent />} />
            <Route path={ROUTE_PATHS.INBOX} element={<InboxContent />} />
            <Route path={ROUTE_PATHS.EXPLORE} element={<ExploreContent />} />
            <Route path={ROUTE_PATHS.ACTIVITY} element={<ActivityContent />} />
            <Route path={ROUTE_PATHS.REEL} element={<ReelContent />} />
            <Route path={ROUTE_PATHS.STREAM} element={<StreamContent />} />
            <Route path={ROUTE_PATHS.SAVED} element={<SavedContent />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.SIGNUP} element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
