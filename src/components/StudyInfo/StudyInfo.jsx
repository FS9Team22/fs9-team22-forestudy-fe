import { useMatch } from 'react-router';
import { Point } from '../ui';
import './StudyInfo.css';
import { HabitButton, HomeButton, TimerButton } from '../ui/Button/NavButton';
import { TimePhill } from '../ui/TimePhill/TimePhill';

export function StudyInfo({ study }) {
  const isDetail = useMatch('/study/:studyId');
  const isTimer = useMatch('/study/:studyId/timer');
  const isHabit = useMatch('/study/:studyId/habit');
  console.log(study);

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
              <HabitButton study={study} />
            </li>
          )}
          {(isDetail || isHabit) && (
            <li>
              <TimerButton study={study} />
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
        {isHabit && <TimePhill />}
      </div>
    </>
  );
}
