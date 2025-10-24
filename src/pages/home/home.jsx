import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useStudies } from '../../hooks/useStudies';
import { useBreakPoint } from '../../hooks/useBreakPoint';
import { StudyCardList } from './components/Card/StudyCardList';
import { DropDown } from './components/DropDown/DropDown';
import { SearchBar } from './components/SearchBar/SearchBar';
import './home.css';

const ONE_HOUR = 60 * 60 * 1000;
const MAX_STUDIES_LENGTH = 3;
const LIMIT = 6;

export default function Home() {
  const [recentStudies, setRecentStudies] = useLocalStorage(
    'recentStudies',
    [],
    ONE_HOUR,
  );
  const { mobile } = useBreakPoint();
  const [keyword, setKeyword] = useState('');
  const [sortType, setSortType] = useState('latest');
  const [page, setPage] = useState(1);

  const { studies, loading } = useStudies(sortType, keyword, page, LIMIT);

  const moreBtnPaging = () => {
    setPage((prev) => prev + 1);
  };

  const handleOnLocalStorage = (study) => {
    const filteredStudies = recentStudies.filter(
      (item) => item.id !== study.id,
    );
    const updatedStudies = [study, ...filteredStudies].slice(
      0,
      MAX_STUDIES_LENGTH,
    );
    setRecentStudies(updatedStudies);
  };

  // sortType이나 keyword가 바뀌면 page 초기화
  useEffect(() => {
    setPage(1);
  }, [sortType, keyword]);

  if (loading) return <div>로딩중...</div>

  return (
    <>
      <div className="home-main-container">
        <div className="home-main-top">
          <h2 className="home-study-title home-study-title-recent">
            최근 조회한 스터디
          </h2>
          {recentStudies.length > 0 ? (
            <StudyCardList className={true} cards={recentStudies} />
          ) : (
            <div className="no-studies-message">
              아직 조회한 스터디가 없어요
            </div>
          )}
        </div>

        <div className="home-main-center">
          <div className="home-study-header">
            <h2 className="home-study-title">스터디 둘러보기</h2>
            <div className="home-study-dropdown">
              {!mobile && <DropDown onSortType={setSortType} />}
            </div>
          </div>

          <div className="home-study-search">
            <SearchBar
              className={mobile ? 'home-study-for-mobile' : 'home-study-search'}
              onSearch={setKeyword}
            />
            {mobile && <DropDown onSortType={setSortType} />}
          </div>
          {!loading && studies.length > 0 ? (
            <>
              <StudyCardList cards={studies} setLocal={handleOnLocalStorage} />
              <div className="home-main-btn">
                <button className="home-card-more" onClick={moreBtnPaging}>
                  더보기
                </button>
              </div>
            </>
          ) : (
            <div className="no-studies-message">
              아직 둘러 볼 스터디가 없어요
            </div>
          )}
        </div>
      </div>
    </>
  );
}
