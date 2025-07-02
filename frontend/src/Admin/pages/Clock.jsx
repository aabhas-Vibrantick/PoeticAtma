import React, { useState, useEffect } from 'react';

function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const formattedTime = dateTime.toLocaleTimeString();
  const formattedDate = dateTime.toLocaleDateString();

  return (
    <div className="clock">
      
      <p >{formattedTime}</p>
      <p className='px-5'>{formattedDate}</p>
    </div>
  );
}

export default Clock;
