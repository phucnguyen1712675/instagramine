import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {PATHS} from './constants';
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
import {AppStyles, RequireAuth, ProtectedRoute, HomeLayout} from './components';
import {AuthContextProvider} from './store/authContext';

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
