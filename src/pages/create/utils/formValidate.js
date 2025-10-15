const NICKNAME_MIN = 1;
const NICKNAME_MAX = 6;
const TITLE_MIN = 1;
const TITLE_MAX = 10;
const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 100;
const PASSWORD_MIN = 6;

export const nicknameValidator = (input) => {
  if (!input) return '*닉네임을 입력해주세요';
  if (input <= NICKNAME_MIN) return '*닉네임은 1자리이상 입력해주세요';
  if (input >= NICKNAME_MAX) return '*닉네임은 6자리이하로 입력해주세요';
  return '';
};

export const titleValidator = (input) => {
  if (!input) return '*스터디 이름을 입력해주세요';
  if (input <= TITLE_MIN) return '*스터디 이름을 1자리 이상 입력해주세요';
  if (input >= TITLE_MAX) return '*스터디 이름을 1자리 이상 입력해주세요';
  return '';
};

export const descriptionValidator = (input) => {
  if (!input) return '*소개란을 입력해주세요';
  if (input <= DESCRIPTION_MIN)
    return '*소개란은 1자리 이상 100자 이내로 입력해주세요';
  if (input >= DESCRIPTION_MAX)
    return '*소개란은 1자리 이상 100자 이내로 입력해주세요';
  return '';
};

export const passwordValidator = (input) => {
  if (!input) return '*패스워드를 입력해주세요';
  if (input <= PASSWORD_MIN) return '*패스워드는 6자리 이상입니다.';
  return '';
};

export const PasswordCheckValidator = (input, compare) => {
  if (!input) return '*비밀번호를 입력해주세요.';
  if (input !== compare) return '*비밀번호가 일치하지 않습니다.';
  return '';
};
