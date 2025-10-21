export function StudyInfo({ study }) {
  return (
    <>
      <div className="section-title-wrap">
        <h1 className="title-box large-header">
          <span className="study-nickname">{study.nickname}</span>
          <span>의 </span>
          <span className="study-title">{study.title}</span>
        </h1>
        <ul className="link-btn-list">
          <li>습관버튼컴포넌트</li>
          <li>집중버튼컴포넌트</li>
        </ul>
      </div>
      <div className="section-mid-wrap">
        <div className="description-box">
          <h3 className="small-header">소개</h3>
          <p className="study-description">{study.description}</p>
        </div>
        <div className="point-box">
          <h3 className="small-header">현재까지 획득한 포인트</h3>
          <div>포인트알약컴포넌트</div>
        </div>
      </div>
    </>
  );
}
