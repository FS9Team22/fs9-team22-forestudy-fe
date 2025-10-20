const BACKGROUNDS = [
  { id: 1, type: 'color', value: '#E1EDDE' },
  { id: 2, type: 'color', value: '#FFF1CC' },
  { id: 3, type: 'color', value: '#E0F1F5' },
  { id: 4, type: 'color', value: '#FDE0E9' },
  { id: 5, type: 'image', value: '/images/desk1.png' },
  { id: 6, type: 'image', value: '/images/desk2.png' },
  { id: 7, type: 'image', value: '/images/pattern.png' },
  { id: 8, type: 'image', value: '/images/leaves.png' },
];

const INITIAL_VALUE = {
  nickname: '',
  title: '',
  description: '',
  background: null,
  password: '',
  passwordChecker: '',
};

export { BACKGROUNDS, INITIAL_VALUE };
