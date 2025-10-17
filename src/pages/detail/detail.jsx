import './detail.css';
import { WeeklyHabitTable } from './weeklyHabitTable';

export function DetailPage() {
  return (
    <main className="detail-main">
      <section className="detail-section">
        <div className="section-top-wrap">
          <div className="study-reaction">리액션컴포넌트</div>
          <ul className="top-btn-list">
            <li>공유하기</li>
            <span>|</span>
            <li>수정하기</li>
            <span>|</span>
            <li>삭제하기</li>
          </ul>
        </div>
        <div className="section-title-wrap">
          <h1 className="title-box large-header">
            <span className="study-nickname">마루</span>
            <span>의 </span>
            <span className="study-title">만화 스터디</span>
          </h1>
          <ul className="link-btn-list">
            <li>습관버튼컴포넌트</li>
            <li>집중버튼컴포넌트</li>
          </ul>
        </div>
        <div className="section-mid-wrap">
          <div className="description-box">
            <h3 className="small-header">소개</h3>
            <p className="study-description">
              소개가 여기 들어갑니다 소개가 여기 들어갑니다 소개가
            </p>
          </div>
          <div className="point-box">
            <h3 className="small-header">현재까지 획득한 포인트</h3>
            <div>포인트알약컴포넌트</div>
          </div>
          <WeeklyHabitTable />
        </div>
      </section>
    </main>
  );
}
