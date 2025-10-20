import { BrowserRouter, Routes, Route } from 'react-router';
import DailyHabit from './pages/habit/DailyHabit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h1>🌲 ForStudy</h1>
              <p>개발 중입니다...</p>
              <a
                href="/daily-habit"
                style={{
                  padding: '10px 20px',
                  background: '#99c86e',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                }}
              >
                데일리 해빗 가기 →
              </a>
            </div>
          }
        />

        <Route path="/daily-habit" element={<DailyHabit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
