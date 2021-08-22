import React, { useCallback, useEffect, useState } from 'react';
import { TOKEN_LIFESPAN_IN_MS } from '../../../../constants/defaults/uiConfig';
import { useRootState } from '../../../../states/rootState';

const AuthTimer = () => {
  const rs = useRootState();
  const [timeLeft, setTimeLeft] = useState(0);
  const { jwtToken, jwtTime } = rs;

  const timer = useCallback(() => {
    const currentTime = Date.now();
    const minsLeft = parseInt(
      parseInt(jwtTime, 10) + TOKEN_LIFESPAN_IN_MS - currentTime, 10,
    ) / 60000;
    setTimeLeft(jwtToken ? Math.round(minsLeft) : 0);
  }, [jwtToken, jwtTime]);

  useEffect(() => {
    setInterval(() => timer, 1000);

    return () => {
      clearInterval(timer);
      setTimeLeft(0);
    };
  }, [timer]);

  return (
    <div>
      {timeLeft}
    </div>
  );
};

export default AuthTimer;
