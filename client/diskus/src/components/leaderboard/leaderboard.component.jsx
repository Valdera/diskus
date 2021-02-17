import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../../api/auth.request';
import './leaderboard.styles.scss';
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState('');

  const leaderboardGetter = async () => {
    setLeaderboard(await getLeaderboard());
  };

  useEffect(() => {
    leaderboardGetter();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="leaderboard">
      <h3>Top Members</h3>
      {leaderboard
        ? leaderboard.map((user, index) => (
            <div className="leaderboard__item">
              <span className="leaderboard__number">{index + 1}</span>
              <p>{user.name.substring(0, 15)}</p>
              <span className="leaderboard__points">{user.point} Points</span>
            </div>
          ))
        : ''}
    </div>
  );
};

export default Leaderboard;
