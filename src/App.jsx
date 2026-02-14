import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Questions from './pages/Questions';
import Review from './pages/Review';
import Analytics from './pages/Analytics';
import './styles/variables.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/review" element={<Review />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
