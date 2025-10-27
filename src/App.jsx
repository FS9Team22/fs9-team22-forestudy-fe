import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '@/pages/home/home';
import CreatePage from '@/pages/create/create';
// import FormPage from './pages/form/form';
import DetailPage from '@/pages/detail/detail';
import HabitPage from '@/pages/habit/DailyHabit';
import TimerPage from '@/pages/timer/timer';
import NotFoundRoute from '@/pages/not-found';
import { Nav } from '@/components/ui';
import StudyLayout from './components/StudyLayout/StudyLayout';

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
          {/* <Route path="/study/:studyId/update" element={<FormPage />} /> */}
          {/* 스터디 상세 */}
          <Route path="/study/:studyId/" element={<StudyLayout />}>
            <Route index={true} element={<DetailPage />} />
            <Route path="habit" element={<HabitPage />} />
            <Route path="timer" element={<TimerPage />} />
          </Route>
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
