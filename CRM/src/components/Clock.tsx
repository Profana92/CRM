import { useState, useEffect } from 'react';
function Clock() {
   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   return <p>{currentTime}</p>;
}

export default Clock;
