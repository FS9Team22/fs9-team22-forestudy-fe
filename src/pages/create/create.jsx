import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { createStudy } from '@/api/StudyService';
import { BackgroundList } from './components/Background';
import { BACKGROUNDS, INITIAL_VALUE } from './utils/constants';
import closeEye from '@/assets/icons/btn_visibility_off.svg';
import openEye from '@/assets/icons/btn_visibility_on.svg';
import './create.css';
import { useFormik } from 'formik';
import { validationSchema } from './utils/formValidate';
import { Toast } from '@/components/ui';

export default function CreatePage() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordCheckerVisible, setPasswordCheckerVisible] = useState(true);

  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const res = await createStudy(
          values.nickname,
          values.title,
          values.description,
          values.background,
          values.password,
        );
        if (res.success) {
          setStatus({
            success: true,
            message: res.message || '스터디를 생성 하였습니다.',
          });
          // navigate('/');
        } else {
          setStatus({
            success: false,
            message: res.message || '스터디 생성에 실패했습니다.',
          });
        }
      } catch (err) {
        setStatus({
          success: false,
          message: err.message || '알 수 없는 오류 발생',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const setBgSelected = useCallback(
    (id) => {
      formik.setFieldValue('background', id);
      formik.setFieldTouched('background', true);
    },
    [formik],
  );

  return (
    <>
      <main className="create-main">
        <div className="create-container">
          <h2 className="create-title">스터디 만들기</h2>

          <form
            className="create-form"
            method="post"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              {...formik.getFieldProps('nickname')}
              placeholder="닉네임을 입력해 주세요"
              aria-label="닉네임을 입력해 주세요"
              className={
                formik.touched.nickname && formik.errors.nickname
                  ? 'error-input'
                  : ''
              }
              required
            />
            {formik.touched.nickname && formik.errors.nickname && (
              <span className="error">{formik.errors.nickname}</span>
            )}
            <label htmlFor="title">스터디 이름</label>
            <input
              id="title"
              name="title"
              type="text"
              {...formik.getFieldProps('title')}
              placeholder="스터디 이름을 입력해주세요"
              aria-label="스터디 이름을 입력해주세요"
              className={
                formik.touched.title && formik.errors.title ? 'error-input' : ''
              }
              required
            />
            {formik.touched.title && formik.errors.title && (
              <span className="error">{formik.errors.title}</span>
            )}
            <label htmlFor="description">소개</label>
            <textarea
              id="description"
              name="description"
              type="text"
              {...formik.getFieldProps('description')}
              placeholder="소개 멘트를 작성해 주세요"
              aria-label="소개 멘트를 작성해 주세요"
              className={`description-textarea ${formik.touched.description && formik.errors.description ? 'error-input' : ''}`}
              required
            />
            {formik.touched.description && formik.errors.description && (
              <span className="error">{formik.errors.description}</span>
            )}
            <label htmlFor="bg-label">배경을 선택해주세요</label>
            <BackgroundList
              backgrounds={BACKGROUNDS}
              bgSelected={formik.values.background}
              setBgSelected={setBgSelected}
            />
            {formik.touched.background && formik.errors.background && (
              <span className="error">{formik.errors.background}</span>
            )}

            <label htmlFor="password">비밀번호</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'password' : 'text'}
                {...formik.getFieldProps('password')}
                placeholder="비밀번호를 입력해 주세요"
                aria-label="비밀번호를 입력해 주세요"
                className={
                  formik.touched.password && formik.errors.password
                    ? 'error-input'
                    : ''
                }
                required
              />
              <img
                src={passwordVisible ? closeEye : openEye}
                className="eye-icons"
                alt="비밀번호 표시"
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="error">{formik.errors.password}</span>
            )}
            <label htmlFor="passwordChecker">비밀번호 확인</label>
            <div className="password-check-wrapper">
              <input
                id="passwordChecker"
                name="passwordChecker"
                type={passwordCheckerVisible ? 'password' : 'text'}
                {...formik.getFieldProps('passwordChecker')}
                placeholder="비밀번호를 입력해 주세요"
                aria-label="비밀번호를 입력해 주세요"
                className={
                  formik.touched.passwordChecker &&
                  formik.errors.passwordChecker
                    ? 'error-input'
                    : ''
                }
                required
              />
              <img
                src={passwordCheckerVisible ? closeEye : openEye}
                className="eye-icons"
                alt="비밀번호확인 표시"
                onClick={() => setPasswordCheckerVisible((prev) => !prev)}
              />
            </div>
            {formik.touched.passwordChecker &&
              formik.errors.passwordChecker && (
                <span className="error">{formik.errors.passwordChecker}</span>
              )}

            <button
              className="create-btn"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? '만드는 중...' : '만들기'}
            </button>
          </form>
        </div>

        {/* 토스트 메시지를 띄우고 닫힌 상태일때 리다이렉트 */}
        {formik.status && !formik.status.success && (
          <Toast
            message={formik.status.message}
            type="info"
            onClose={() => navigate('/')}
          />
        )}
        {formik.status && formik.status.success && (
          <Toast
            message={formik.status.message}
            type="success"
            onClose={() => navigate('/')}
          />
        )}
      </main>
    </>
  );
}
