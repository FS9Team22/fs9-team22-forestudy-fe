const NICKNAME_MIN = 1;
const NICKNAME_MAX = 6;
const TITLE_MIN = 2;
const TITLE_MAX = 10;
const DESCRIPTION_MIN = 2;
const DESCRIPTION_MAX = 100;
const PASSWORD_MIN = 6;

export const nicknameValidator = (name) => {
  if (!name) return '*닉네임을 입력해주세요';
  if (name.length <= NICKNAME_MIN)
    return `*닉네임은 ${NICKNAME_MIN}자리이상 입력해주세요`;
  if (name.length >= NICKNAME_MAX)
    return `*닉네임은 ${NICKNAME_MAX}자리이하로 입력해주세요`;
  return '';
};

export const titleValidator = (title) => {
  if (!title) return '*스터디 이름을 입력해주세요';
  if (title.length <= TITLE_MIN)
    return `*스터디 이름을 ${TITLE_MIN}자리에서 ${TITLE_MAX} 사이로 입력해주세요`;
  if (title.length >= TITLE_MAX)
    return `*스터디 이름을 ${TITLE_MIN}자리에서 ${TITLE_MAX} 사이로 입력해주세요`;
  return '';
};

export const descriptionValidator = (quote) => {
  if (!quote) return '*소개란을 입력해주세요';
  if (quote.length <= DESCRIPTION_MIN)
    return `*소개란은 ${DESCRIPTION_MIN}자리 이상 ${DESCRIPTION_MAX}자 이내로 입력해주세요`;
  if (quote.length >= DESCRIPTION_MAX)
    return `*소개란은 ${DESCRIPTION_MIN}자리 이상 ${DESCRIPTION_MAX}자 이내로 입력해주세요`;
  return '';
};

export const passwordValidator = (pw) => {
  if (!pw) return '*패스워드를 입력해주세요';
  if (pw.length < PASSWORD_MIN - 1)
    return `*패스워드는 ${PASSWORD_MIN}자리 이상입니다.`;
  return '';
};

export const PasswordCheckValidator = (pwchecker, compare) => {
  if (!pwchecker) return '*비밀번호를 입력해주세요.';
  if (pwchecker && compare !== compare) return '*비밀번호가 일치하지 않습니다.';
  return '';
};
