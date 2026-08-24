import { Route, Routes } from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import ReadLater from './pages/ReadLater.jsx';
import Thread from './pages/Thread.jsx';
import TopStories from './pages/TopStories.jsx';

/**
 * Componente principale dell'applicazione.
 * @returns {React.JSX.Element} - Componente App.
 */
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-stories" element={<TopStories />} />
        <Route path="/thread" element={<Thread />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/read-later" element={<ReadLater />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
