import './StudyInfo.css';
import Point from '../Point/Point';
import { useMatch } from 'react-router';
import { HabitButton, HomeButton, TimerButton } from '../Button/NavButton';

export function StudyInfo({ study }) {
  const isDetail = useMatch('/study/:studyId');
  const isTimer = useMatch('/study/:studyId/timer');
  const isHabit = useMatch('/study/:studyId/habit');

  return (
    <>
      <div className="section-title-wrap">
        <h1 className="title-box large-header">
          <span className="study-nickname">{study.nickname}</span>
          <span>의 </span>
          <span className="study-title">{study.title}</span>
        </h1>
        <ul className="link-btn-list">
          {(isHabit || isTimer) && (
            <li>
              <HomeButton />
            </li>
          )}
          {(isDetail || isTimer) && (
            <li>
              <HabitButton studyId={study.id} />
            </li>
          )}
          {(isDetail || isHabit) && (
            <li>
              <TimerButton studyId={study.id} />
            </li>
          )}
        </ul>
      </div>
      <div className="section-mid-wrap">
        {isDetail && (
          <div className="description-box">
            <h3 className="small-header">소개</h3>
            <p className="study-description">{study.description}</p>
          </div>
        )}
        {(isDetail || isTimer) && <Point points={study.point} />}
        {isHabit && <>현재 시간 컴포넌트</>}
      </div>
    </>
  );
}
