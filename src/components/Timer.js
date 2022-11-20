import React from 'react';

const Timer = ({ timer, timerOn, selectedTimer }) => {
  const secs = timer > 59 ? 0 : timer;
  const mins = Math.floor(timer / 60);

  const selectedSecs = selectedTimer > 59 ? selectedTimer % 60 : selectedTimer;
  const selectedMins = Math.floor(selectedTimer / 60);

  const time = `${mins < 10 ? '0' + mins : mins}:${
    secs < 10 ? '0' + secs : secs
  }`;
  const selectedTime = `${
    selectedMins < 10 ? '0' + selectedMins : selectedMins
  }:${selectedSecs < 10 ? '0' + selectedSecs : selectedSecs}`;
  return (
    <div>
      <p>{timerOn ? selectedTime : time}</p>
    </div>
  );
};

export default Timer;
