import { useCallback } from 'react';
import { Navigate } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { createStudy } from '../../api/StudyService';
import {
  nicknameValidator,
  titleValidator,
  descriptionValidator,
  passwordValidator,
} from './utils/formValidate';
import { Nav } from '../../components/Nav/Nav';
import { BackgroundList } from './components/Background';
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

const initialValues = {
  nickname: '',
  title: '',
  description: '',
  background: null,
  password: '',
  passwordChecker: '',
};

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
    useForm(initialValues, validator);
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
          if (response.status === 201) {
            alert('스터디가 성공적으로 생성되었습니다!');
            Navigate('/');
          }
        } catch (err) {
          alert(`스터디 생성 실패: ${err.message}`);
        }
      } else {
        console.log('폼 유효성 검사 실패:', errors);
      }
    },
    [values, validateOnSubmit, errors],
  );

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
              onChange={handleOnChange}
              value={values.nickname}
              placeholder="닉네임을 입력해 주세요"
              required
            />
            {errors.nickname && (
              <span className="error">{errors.nickname}</span>
            )}
            <label htmlFor="study-name">스터디 이름</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleOnChange}
              value={values.title}
              placeholder="스터디 이름을 입력해주세요"
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
              required
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}

            <label htmlFor="bg-label">배경 선택</label>
            <BackgroundList
              backgrounds={backgrounds}
              bgSelected={values.background}
              setBgSelected={setBgSelected}
            />

            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleOnChange}
              value={values.password}
              placeholder="비밀번호를 입력해 주세요"
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <label htmlFor="password-check">비밀번호 확인</label>
            <input
              id="passwordChecker"
              name="passwordChecker"
              type="password"
              onChange={handleOnChange}
              value={values.passwordChecker}
              placeholder="비밀번호를 입력해 주세요"
              required
            />
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
