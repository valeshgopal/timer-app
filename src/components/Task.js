import React, { useEffect, useState } from 'react';
import Timer from './Timer';

const Task = ({ task, tasks, setTasks }) => {
  const { id, taskName, timer } = task;
  const [timerOn, setTimerOn] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedTimer, setSelectedTimer] = useState(timer);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTimer = (id) => {
    setSelectedTask(tasks.find((task) => task.id === id));
    setTimerOn(!timerOn);
  };

  useEffect(() => {
    let interval;

    if (timerOn) {
      interval = setInterval(() => {
        setSelectedTimer((selectedTask.timer += 1));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [selectedTimer]);

  return (
    <div className='task'>
      <p>{taskName}</p>
      <div className='btns'>
        <Timer timer={timer} timerOn={timerOn} selectedTimer={selectedTimer} />
        <button className='btn' onClick={() => handleTimer(id)}>
          {!timerOn ? 'Start Timer' : 'Stop Timer'}
        </button>
        <button className='btn' onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
