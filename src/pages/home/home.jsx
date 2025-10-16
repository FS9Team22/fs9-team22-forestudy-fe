import { useEffect, useState } from 'react';
import { getStudy } from '../../api/StudyService';
import { StudyCardList } from './components/Card/StudyCardList';
import { Nav } from '../../components/Nav/Nav';
import { DropDown } from './components/DropDown/DropDown';
import { SearchBar } from './components/SearchBar/SearchBar';
import './home.css';
import { useBreakPoint } from '../../hooks/useBreakPoint';

const LIMIT = 6;

export default function Home() {
  const { mobile, tablet } = useBreakPoint();
  const [recentStudies, setRecentStudies] = useState([]);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [sortType, setSortType] = useState('latest');

  const [page, setPage] = useState(1);

  const moreBtnPaging = () => {
    setPage((prev) => prev + 1);
  };

  // sortType이나 keyword가 바뀌면 page 초기화
  useEffect(() => {
    setPage(1);
  }, [sortType, keyword]);

  useEffect(() => {
    const savedRecent = localStorage.getItem('recentStudies');
    if (savedRecent) {
      setRecentStudies(JSON.parse(savedRecent));
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const studyData = await getStudy(sortType, keyword, page, LIMIT);
        // 기존 데이터 이어 붙이기
        if (page === 1)
          setStudies(studyData.data); //첫페이지는 그대로 내려오고 > 이후 이어붙이기
        else setStudies((prev) => [...prev, ...studyData.data]);
      } catch (err) {
        console.error('스터디 가져오기에 실패하였습니다.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortType, keyword, page]);

  return (
    <>
      <Nav />
      <div className="home-main-container">
        <div className="home-main-top">
          <h2 className="home-study-title">최근 조회한 스터디</h2>
          {recentStudies.length > 0 ? (
            <StudyCardList
              className={'home-study-on-tablet'}
              cards={recentStudies}
            />
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
              {!tablet || (!mobile && <DropDown onSortType={setSortType} />)}
            </div>
          </div>

          <div className="home-study-search">
            <SearchBar
              className={mobile && 'home-study-for-mobile'}
              onSearch={setKeyword}
            />
            {tablet || (mobile && <DropDown onSortType={setSortType} />)}
          </div>
          {!loading && studies.length > 0 ? (
            <>
              <StudyCardList cards={studies} />

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
