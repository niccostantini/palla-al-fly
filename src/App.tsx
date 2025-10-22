import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { Dashboard } from './pages/Dashboard';
import { AuthPage } from './pages/AuthPage';
import { MatchDetail } from './pages/MatchDetail';
import { VenuesPage } from './pages/VenuesPage';
import { CreateMatchPage } from './pages/CreateMatchPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

function App() {
  console.log('[App] Rendering App component');
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/match/:id" element={<MatchDetail />} />
                <Route path="/venues" element={<VenuesPage />} />
                <Route path="/create-match" element={<CreateMatchPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              </Routes>
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
