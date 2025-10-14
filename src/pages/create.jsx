import { useState } from 'react';
import { Nav } from '../components/Nav/Nav';
import './create.css';

// 배경을 위한 목데이타 (따로파일분리)
const backgrounds = [
  { id: 'green', type: 'color', value: '#E1EDDE' },
  { id: 'yellow', type: 'color', value: '#FFF1CC' },
  { id: 'blue', type: 'color', value: '#E0F1F5' },
  { id: 'pink', type: 'color', value: '#FDE0E9' },
  { id: 'desk1', type: 'image', value: '/images/desk1.png' },
  { id: 'desk2', type: 'image', value: '/images/desk2.png' },
  { id: 'pattern', type: 'image', value: '/images/pattern.png' },
  { id: 'leaves', type: 'image', value: '/images/leaves.png' },
];
export default function CreatePage() {
  const [bgSelected, setBgSelected] = useState('');
  return (
    <>
      <Nav />
      <main className="create-main">
        <div className="create-container">
          <h2 className="create-title">스터디 만들기</h2>

          <form className="create-form" method="post">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value=""
              placeholder="닉네임을 입력해 주세요"
            />
            <label htmlFor="study-name">스터디 이름</label>
            <input
              id="study-name"
              name="study-name"
              type="text"
              value=""
              placeholder="스터디 이름을 입력해주세요"
            />
            <label htmlFor="description">소개</label>
            <textarea
              className="description-textarea"
              id="description"
              name="description"
              type="text"
              value=""
              placeholder="소개 멘트를 작성해 주세요"
            />
            <label htmlFor="bg-label">배경 선택</label>
            <div className="bg-options-container">
              {backgrounds.map((bg) => (
                <label
                  key={bg.id}
                  className={`bg-options ${bgSelected == bg.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="background"
                    value={bg.id}
                    checked={bgSelected === bg.id}
                    onSelect={() => setBgSelected(bg.id)}
                  />
                  {bg.type === 'color' ? (
                    <div
                      className="bg-preview"
                      style={{ backgroundColor: bg.value }}
                    />
                  ) : (
                    <img className="bg-preview" src={bg.value} alt={bg.id} />
                  )}
                </label>
              ))}
            </div>

            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              value=""
              placeholder="비밀번호를 입력해 주세요"
            />
            <label htmlFor="password-check">비밀번호 확인</label>
            <input
              id="password-check"
              name="password-check"
              type="password"
              value=""
              placeholder="비밀번호를 입력해 주세요"
            />
          </form>

          <div className="create-btn-container">
            <button className="create-btn">만들기</button>
          </div>
        </div>
      </main>
    </>
  );
}
