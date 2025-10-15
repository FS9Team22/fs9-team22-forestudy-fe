import { useState, useCallback } from 'react';

export function useForm(initialValues, validators) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleOnChange = useCallback(
    (e) => {
      /** @see https://elecch.tistory.com/563  */
      const { name, value } = e.target;
      const trimmed = value.trim();

      // 밸류 공백제거
      setValues((prev) => ({
        ...prev,
        [name]: trimmed,
      }));

      // 각 개별 유효성 검사
      // password and checker 확인 필드 변경시 두필드 유효성 검사
      if (name === 'password' || name === 'passwordChecker') {
        const newErrors = {};
        newErrors.password = validators.password(trimmed, {
          ...values,
          [name]: trimmed,
        });
        newErrors.passwordChecker = validators.passwordChecker(trimmed, {
          ...values,
          [name]: trimmed,
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
        // 유효성 검사시 라디오 버튼 제외 (배경 선택시 바로 오류 표시x)
      } else if (validators[name] && e.target.type !== 'radio') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validators[name](trimmed, values),
        }));
      }
    },
    [values, validators],
  );

  // 전체 폼 제출 시 유효성 검사 및 오류 업데이트(전체 확인)
  const validateOnSubmit = useCallback(() => {
    let newErrors = {};
    let formIsValid = true;

    // 특정 프로퍼티가 존재시 if문실행
    for (const key in validators) {
      if (Object.hasOwn(validators, key)) {
        const error = validators[key](values[key], values);
        if (error) {
          newErrors = { ...newErrors, [key]: error };
          formIsValid = false;
        }
      }
    }

    setErrors(newErrors);
    return formIsValid;
  }, [values, validators]);

  return {
    values,
    errors,
    handleOnChange,
    setValues,
    validateOnSubmit,
  };
}
