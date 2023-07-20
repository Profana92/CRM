import { useState, useEffect } from 'react';
function Clock() {
   const [currentTime, setCurrentTime] = useState(new Date());
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   return (
      <p className="hidden lg:block text-2xl font-medium">{`${currentTime.getHours() < 10 ? '0' : ''}${currentTime.getHours()} : ${
         currentTime.getMinutes() < 10 ? '0' : ''
      }${currentTime.getMinutes()} : ${currentTime.getSeconds() < 10 ? '0' : ''}${currentTime.getSeconds()}`}</p>
   );
}

export default Clock;
