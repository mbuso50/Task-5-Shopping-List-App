
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Component/store';
import HomePage from './Component/pages/Home-page';
import AuthPage from './Component/pages/Auth-page';
import ShoppingPage from './Component/pages/Shopping-page';
import ListsPage from './Component/pages/Lists-page';
import CategoriesPage from './Component/pages/Categories-page';
import FavoritesPage from './Component/pages/Favorites-page';
import AboutPage from './Component/pages/About-page';
import ContactPage from './Component/pages/Contact-page';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Routes */}
            <Route
              path="/shopping"
              element={
                <ProtectedRoute>
                  <ShoppingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lists"
              element={
                <ProtectedRoute>
                  <ListsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />


            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;