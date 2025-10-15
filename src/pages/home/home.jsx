import { useEffect, useState } from 'react';
import { StudyCardList } from './components/Card/StudyCardList';
import { Nav } from '../../components/Nav/Nav';
import { DropDown } from './components/DropDown/DropDown';
import { SearchBar } from './components/SearchBar/SearchBar';
import './home.css';

// TODOS: 백엔드에서 가져올 데이터를 가정 (목 데이터로 대체)
const allStudies = [
  {
    id: 1,
    title: '의 UX 스터디',
    nickname: '이유디',
    status: '62일째 진행 중',
    description: 'Slow And Steady Wins The Race!!',
    points: 310,
    likes: 37,
    views: 26,
    comments: 14,
    background: 6,
  },
  {
    id: 2,
    title: '의 UX 스터디',
    nickname: 'K.K.',
    status: '62일째 진행 중',
    points: 310,
    description: '나비보벳따우',
    likes: 37,
    views: 26,
    comments: 14,
    background: 1,
  },
  {
    id: 3,
    title: '의 개발공장',
    nickname: '연우',
    status: '10일째 진행 중',
    points: 50,
    description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
    likes: 12,
    views: 11,
    comments: 9,
    background: 2,
  },
  {
    id: 4,
    title: '의 개발공장',
    nickname: '연우',
    status: '10일째 진행 중',
    points: 50,
    description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
    likes: 12,
    views: 11,
    comments: 9,
    background: 6,
  },
  {
    id: 5,
    title: '의 개발공장',
    nickname: '연우',
    status: '10일째 진행 중',
    points: 50,
    description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
    likes: 12,
    views: 11,
    comments: 9,
    background: 1,
  },
  {
    id: 6,
    title: '의 개발공장',
    nickname: '연우',
    status: '10일째 진행 중',
    points: 50,
    description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
    likes: 12,
    views: 11,
    comments: 9,
    background: 2,
  },
];

export default function Home() {
  const [recentStudies, setRecentStudies] = useState([]);

  useEffect(() => {
    const savedRecent = localStorage.getItem('recentStudies');
    if (savedRecent) {
      setRecentStudies(JSON.parse(savedRecent));
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="home-main-container">
        <div className="home-main-top">
          <h2 className="home-study-title">최근 조회한 스터디</h2>
          {recentStudies.length > 0 ? (
            <StudyCardList cards={recentStudies} />
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
              <DropDown />
            </div>
          </div>

          <div className="home-study-search">
            <SearchBar />
          </div>
          {allStudies.length > 0 ? (
            <>
              <StudyCardList cards={allStudies} />

              <div className="home-main-btn">
                <button className="home-card-more">더보기</button>
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
