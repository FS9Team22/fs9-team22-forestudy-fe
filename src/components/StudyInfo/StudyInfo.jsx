import './StudyInfo.css';
import Point from '../Point/Point';
import { useMatch } from 'react-router';

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
          {(isHabit || isTimer) && <li>홈버튼컴포넌트</li>}
          {(isDetail || isTimer) && <li>습관버튼컴포넌트</li>}
          {(isDetail || isHabit) && <li>집중버튼컴포넌트</li>}
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
