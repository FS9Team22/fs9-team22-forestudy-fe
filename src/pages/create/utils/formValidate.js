import { object, string, number, ref } from 'yup';

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 6;
const TITLE_MIN = 2;
const TITLE_MAX = 10;
const DESCRIPTION_MIN = 2;
const DESCRIPTION_MAX = 100;
const PASSWORD_MIN = 6;

export const validationSchema = object({
  nickname: string()
    .required('*닉네임을 입력해주세요')
    .min(2, `*닉네임은 ${NICKNAME_MIN}자리이상 입력해주세요`)
    .max(NICKNAME_MAX, `*닉네임은 ${NICKNAME_MAX}자리이하로 입력해주세요`),

  title: string()
    .required('*스터디 이름을 입력해주세요')
    .min(
      TITLE_MIN,
      `*스터디 이름을 ${TITLE_MIN}자리에서 ${TITLE_MAX} 사이로 입력해주세요`,
    )
    .max(
      TITLE_MAX,
      `*스터디 이름을 ${TITLE_MIN}자리에서 ${TITLE_MAX} 사이로 입력해주세요`,
    ),

  description: string()
    .required('*소개란을 입력해주세요')
    .min(
      DESCRIPTION_MIN,
      `*소개란은 ${DESCRIPTION_MIN}자리 이상 ${DESCRIPTION_MAX}자 이내로 입력해주세요`,
    )
    .max(
      DESCRIPTION_MAX,
      `*소개란은 ${DESCRIPTION_MIN}자리 이상 ${DESCRIPTION_MAX}자 이내로 입력해주세요`,
    ),

  background: number()
    .required('배경을 선택해주세요')
    .typeError('배경을 선택해주세요'),

  password: string()
    .required('*패스워드를 입력해주세요')
    .min(PASSWORD_MIN, `*패스워드는 ${PASSWORD_MIN}자리 이상입니다.`),

  passwordChecker: string()
    .required('비밀번호가 일치하지 않습니다.')
    .oneOf([ref('password')], '비밀번호가 일치하지 않습니다'),
});
