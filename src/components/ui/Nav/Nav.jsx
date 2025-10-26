import { Link, useMatch, useLocation } from 'react-router';
import styles from './Nav.module.css';
import mainLogo from '../../../assets/icons/img_logo.svg';

export function Nav() {
  const isHome = useMatch('/');
  const location = useLocation();

  // not found 페이지 제외
  if (location.pathname === '*') return null;

  return (
    <div className={styles.NavContainer}>
      <Link className={styles.NavMainLogo} to="/">
        <img src={mainLogo} alt="공부의 숲 로고" />
      </Link>
      {isHome && (
        <Link className={styles.NavLink} to="/create">
          <p>스터디 만들기</p>
        </Link>
      )}
    </div>
  );
}
