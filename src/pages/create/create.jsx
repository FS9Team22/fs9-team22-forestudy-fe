import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { createStudy } from '../../api/StudyService';
import {
  nicknameValidator,
  titleValidator,
  descriptionValidator,
  passwordValidator,
} from './utils/formValidate';
import { BackgroundList } from './components/Background';
import { BACKGROUNDS, INITIAL_VALUE } from './utils/constants';
import closeEye from '../../assets/icons/btn_visibility_off.svg';
import openEye from '../../assets/icons/btn_visibility_on.svg';
import './create.css';

const backgroundValidator = (value) => {
  if (!value) {
    return '배경을 선택해주세요.';
  }
  return '';
};

const validator = {
  nickname: nicknameValidator,
  title: titleValidator,
  description: descriptionValidator,
  background: backgroundValidator,
  password: (value, values) => passwordValidator(value, values.passwordChecker),
  passwordChecker: (value, values) => passwordValidator(values.password, value),
};

export default function CreatePage() {
  const { values, errors, handleOnChange, setValues, validateOnSubmit } =
    useForm(INITIAL_VALUE, validator);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordCheckerVisible, setPasswordCheckerVisible] = useState(true);

  const navigate = useNavigate();
  const setBgSelected = useCallback(
    (id) => {
      setValues((prev) => ({ ...prev, background: id }));
    },
    [setValues],
  );

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const isValid = validateOnSubmit();

      if (isValid) {
        try {
          const response = await createStudy(
            values.nickname,
            values.title,
            values.description,
            values.background,
            values.password,
          );
          if (response.success) {
            alert('스터디가 성공적으로 생성되었습니다!');
            navigate('/');
          }
        } catch (err) {
          alert(`스터디 생성 실패: ${err.message}`);
        }
      } else {
        alert(`필수칸을 확인주세요`);
      }
    },
    [values, validateOnSubmit, navigate],
  );

  return (
    <>
      <main className="create-main">
        <div className="create-container">
          <h2 className="create-title">스터디 만들기</h2>

          <form className="create-form" method="post" onSubmit={handleOnSubmit}>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              onChange={handleOnChange}
              value={values.nickname}
              placeholder="닉네임을 입력해 주세요"
              aria-label="닉네임을 입력해 주세요"
              required
            />
            {errors.nickname && (
              <span className="error">{errors.nickname}</span>
            )}
            <label htmlFor="title">스터디 이름</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleOnChange}
              value={values.title}
              placeholder="스터디 이름을 입력해주세요"
              aria-label="스터디 이름을 입력해주세요"
              required
            />
            {errors.title && <span className="error">{errors.title}</span>}
            <label htmlFor="description">소개</label>
            <textarea
              className="description-textarea"
              id="description"
              name="description"
              type="text"
              onChange={handleOnChange}
              value={values.description}
              placeholder="소개 멘트를 작성해 주세요"
              aria-label="소개 멘트를 작성해 주세요"
              required
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}

            <label htmlFor="bg-label">배경을 선택해주세요</label>
            <BackgroundList
              backgrounds={BACKGROUNDS}
              bgSelected={values.background}
              setBgSelected={setBgSelected}
            />

            <label htmlFor="password">비밀번호</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'password' : 'text'}
                onChange={handleOnChange}
                value={values.password}
                placeholder="비밀번호를 입력해 주세요"
                aria-label="비밀번호를 입력해 주세요"
                required
              />
              <img
                src={passwordVisible ? closeEye : openEye}
                className="eye-icons"
                alt="비밀번호 표시"
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <label htmlFor="passwordChecker">비밀번호 확인</label>
            <div className="password-check-wrapper">
              <input
                id="passwordChecker"
                name="passwordChecker"
                type={passwordCheckerVisible ? 'password' : 'text'}
                onChange={handleOnChange}
                value={values.passwordChecker}
                placeholder="비밀번호를 입력해 주세요"
                aria-label="비밀번호를 입력해 주세요"
                required
              />
              <img
                src={passwordCheckerVisible ? closeEye : openEye}
                className="eye-icons"
                alt="비밀번호확인 표시"
                onClick={() => setPasswordCheckerVisible((prev) => !prev)}
              />
            </div>
            {errors.passwordChecker && (
              <span className="error">{errors.passwordChecker}</span>
            )}

            <button className="create-btn" type="submit">
              만들기
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
