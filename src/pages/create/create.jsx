import { useState } from 'react';
// import { createStudy } from '../../api/StudyService';
import {
  nicknameValidator,
  titleValidator,
  descriptionValidator,
  passwordValidator,
} from './utils/formValidate';
import { Nav } from '../../components/Nav/Nav';
import { BackgroundList } from './components/Background';
import './create.css';
// import { Navigate } from 'react-router';
import { useForm } from '../../hooks/useForm';

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
  password: '',
  passwordChecker: '',
};

const validator = {
  nickname: nicknameValidator,
  title: titleValidator,
  description: descriptionValidator,
  password: (value, values) => passwordValidator(value, values.passwordChecker),
  passwordChecker: (value, values) => passwordValidator(values.password, value),
};

export default function CreatePage() {
  const { values, errors, handleOnChange } = useForm(initialValues, validator);
  const [bgSelected, setBgSelected] = useState('');

  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await createStudy(nickname, title, description, 1, pw);

  //     if (response.status === 201) {
  //       Navigate('/');
  //     }
  //   } catch (err) {
  //     console.error('failed', err);
  //   }
  // };
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
              bgSelected={bgSelected}
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
