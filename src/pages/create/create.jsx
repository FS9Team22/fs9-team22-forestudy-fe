import { useEffect, useState } from 'react';
import { createStudy } from '../../api/StudyService';
import {
  nicknameValidator,
  titleValidator,
  descriptionValidator,
  passwordValidator,
  PasswordCheckValidator,
} from './utils/formValidate';
import { Nav } from '../../components/Nav/Nav';
import { BackgroundList } from './components/Background';
import './create.css';
import { Navigate } from 'react-router';

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

  const [toggleBtn, setToggleBtn] = useState(true);
  const [bgSelected, setBgSelected] = useState('');

  useEffect(() => {
    const valid =
      nickname &&
      title &&
      description &&
      pw &&
      pwChecker &&
      !nicknameError &&
      !descriptionError &&
      !pwError &&
      !pwCheckerError;

    if (valid) {
      setToggleBtn(false);
    } else {
      setToggleBtn(true);
    }
  }, [
    nickname,
    description,
    title,
    pw,
    pwChecker,
    nicknameError,
    descriptionError,
    pwCheckerError,
    pwError,
    titleError,
  ]);

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
    setPwCheckerError(PasswordCheckValidator(pwChecker, pw));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (toggleBtn) {
      alert('입력 필드를 확인해주세요!');
      return;
    }
    try {
      const response = await createStudy(nickname, title, description, 1, pw);

      if (response.status === 201) {
        Navigate('/');
      }
    } catch (err) {
      console.error('failed', err);
    }
  };
  return (
    <>
      <Nav />
      <main className="create-main">
        <div className="create-container">
          <h2 className="create-title">스터디 만들기</h2>

          <form className="create-form" method="post" onSubmit={handleOnSubmit}>
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
            <BackgroundList
              backgrounds={backgrounds}
              bgSelected={bgSelected}
              setBgSelected={setBgSelected}
            />

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

            <button className="create-btn" type="submit" disabled={toggleBtn}>
              만들기
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
