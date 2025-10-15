import { useState, useCallback } from 'react';

export function useForm(initialValues, validators) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleOnChange = useCallback(
    (e) => {
      /** @see https://elecch.tistory.com/563  */
      const { name, value } = e.target;
      const trimmed = value.trim();

      setValues((prev) => ({
        ...prev,
        [name]: trimmed,
      }));

      if (validators[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validators[name](trimmed, values),
        }));
      }
    },
    [values, validators],
  );

  return {
    values,
    errors,
    handleOnChange,
  };
}
