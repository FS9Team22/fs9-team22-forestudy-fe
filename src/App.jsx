import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home/home';
import CreatePage from './pages/create/create';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
