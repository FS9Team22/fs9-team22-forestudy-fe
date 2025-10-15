import { useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import {
  nicknameValidator,
  titleValidator,
  descriptionValidator,
  passwordValidator,
} from './utils/formValidate';
import './create.css';

// 배경을 위한 목데이타 (따로파일분리)
const backgrounds = [
  { id: 1, type: 'color', value: '#E1EDDE' },
  { id: 2, type: 'color', value: '#FFF1CC' },
  { id: 3, type: 'color', value: '#E0F1F5' },
  { id: 4, type: 'color', value: '#FDE0E9' },
  { id: 5, type: 'image', value: '/images/desk1.png' },
  { id: 6, type: 'image', value: '/images/desk2.png' },
  { id: 7, type: 'image', value: '/images/pattern.png' },
  { id: 8, type: 'image', value: '/images/leaves.png' },
];
export default function CreatePage() {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwChecker, setPwChecker] = useState('');
  const [pwCheckerError, setPwCheckerError] = useState('');
  const [bgSelected, setBgSelected] = useState('');

  const handleOnChangeNickName = (e) => {
    setNickname(e.target.value.trim());
    setNicknameError(nicknameValidator(nickname));
  };
  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value.trim());
    setTitleError(titleValidator(title));
  };
  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value.trim());
    setDescriptionError(descriptionValidator(description));
  };
  const handleOnChangePw = (e) => {
    setPw(e.target.value.trim());
    setPwError(passwordValidator(pw));
  };
  const handleOnChangePwChecker = (e) => {
    setPwChecker(e.target.value.trim());
    setPwCheckerError(passwordValidator(pwChecker, pw));
  };
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
              onChange={handleOnChangeNickName}
              value={nickname}
              placeholder="닉네임을 입력해 주세요"
              required
            />
            {nicknameError && <span className="error">{nicknameError}</span>}
            <label htmlFor="study-name">스터디 이름</label>
            <input
              id="study-name"
              name="study-name"
              type="text"
              onChange={handleOnChangeTitle}
              value={title}
              placeholder="스터디 이름을 입력해주세요"
              required
            />
            {titleError && <span className="error">{titleError}</span>}
            <label htmlFor="description">소개</label>
            <textarea
              className="description-textarea"
              id="description"
              name="description"
              type="text"
              onChange={handleOnChangeDescription}
              value={description}
              placeholder="소개 멘트를 작성해 주세요"
              required
            />
            {descriptionError && (
              <span className="error">{descriptionError}</span>
            )}
            <label htmlFor="bg-label">배경 선택</label>
            <div className="bg-options-container">
              {backgrounds.map((bg) => (
                <label key={bg.id} className={'bg-options'}>
                  {bgSelected === bg.id && (
                    <div className="selected-container">
                      <div className="selected"></div>
                    </div>
                  )}
                  <input
                    type="radio"
                    name="background"
                    value={bg.id}
                    checked={bgSelected === bg.id}
                    onChange={() => setBgSelected(bg.id)}
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
              onChange={handleOnChangePw}
              value={pw}
              placeholder="비밀번호를 입력해 주세요"
              required
            />
            {pwError && <span className="error">{pwError}</span>}
            <label htmlFor="password-check">비밀번호 확인</label>
            <input
              id="password-check"
              name="password-check"
              type="password"
              onChange={handleOnChangePwChecker}
              value={pwChecker}
              placeholder="비밀번호를 입력해 주세요"
              required
            />
            {pwCheckerError && <span className="error">{pwCheckerError}</span>}
          </form>

          <div className="create-btn-container">
            <button className="create-btn">만들기</button>
          </div>
        </div>
      </main>
    </>
  );
}
