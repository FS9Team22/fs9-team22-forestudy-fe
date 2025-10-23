import React, { useState, useEffect } from 'react';
import Reaction from '../../../../components/Reaction/Reaction';
import styles from './TimerTop.module.css';
import Point from '../../../../components/Point/Point';

const TimerTop = ({ studyId, points: externalPoints }) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!studyId) return;
    async function fetchStudyData() {
      try {
        const res = await fetch(`${API_URL}/study/${studyId}`);
        const data = await res.json();
        console.log('API full data:', data);
        setTitle(data.data.title);
        setPoints(data.data.point);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudyData();
  }, [studyId, API_URL]);

  useEffect(() => {
    if (externalPoints !== undefined) {
      setPoints((prev) => prev + externalPoints);
    }
  }, [externalPoints]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.timerTop}>
      <Reaction studyId={studyId} />
      <div className={styles.topRow}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <Point points={points} />
    </div>
  );
};

export default TimerTop;
