import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home/home';
import CreatePage from './pages/create/create';
// import FormPage from './pages/form/form';
import DetailPage from './pages/detail/detail';
import HabitPage from './pages/habit/DailyHabit';
import TimerPage from './pages/timer/timer';
import NotFoundRoute from './pages/not-found';
import { Nav } from './components/ui';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* 홈 */}
          <Route path="/" element={<Home />} />
          {/* 만들기 */}
          <Route path="/create" element={<CreatePage />} />
          {/* 스터디 상세 */}
          <Route path="/study/:studyId" element={<DetailPage />} />
          {/* <Route path="/study/:studyId/update" element={<FormPage />} /> */}
          <Route path="/study/:studyId/habit" element={<HabitPage />} />
          <Route path="/study/:studyId/timer" element={<TimerPage />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
