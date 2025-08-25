
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/pages/Home-page';
import AuthPage from './Components/pages/Auth-page';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/login" element={<AuthPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;