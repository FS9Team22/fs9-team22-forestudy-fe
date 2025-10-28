import workspaceWindowDeskImg from '../../../assets/card/images/desk1.png';
import workspaceDetailDeskImg from '../../../assets/card/images/desk2.png';
import patternImg from '../../../assets/card/images/pattern.png';
import leavesImg from '../../../assets/card/images/leaves.png';

const BACKGROUNDS = [
  { id: 1, type: 'color', value: '#E1EDDE' },
  { id: 2, type: 'color', value: '#FFF1CC' },
  { id: 3, type: 'color', value: '#E0F1F5' },
  { id: 4, type: 'color', value: '#FDE0E9' },
  { id: 5, type: 'image', value: workspaceWindowDeskImg },
  { id: 6, type: 'image', value: workspaceDetailDeskImg },
  { id: 7, type: 'image', value: patternImg },
  { id: 8, type: 'image', value: leavesImg },
];

const INITIAL_VALUE = {
  nickname: '',
  title: '',
  description: '',
  background: 1,
  password: '',
  passwordChecker: '',
};

export { BACKGROUNDS, INITIAL_VALUE };
