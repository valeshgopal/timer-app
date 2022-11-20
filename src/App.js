import './App.css';
import { useEffect, useState } from 'react';
import Task from './components/Task';
import { v4 as uuidv4 } from 'uuid';

const getTasks = () => {
  const localStorageItems = localStorage.getItem('tasks');
  return localStorageItems ? JSON.parse(localStorageItems) : [];
};

function App() {
  const [tasks, setTasks] = useState(getTasks());
  const [text, setText] = useState('');

  let timer = 0;

  const unique_id = uuidv4();
  const id = unique_id.slice(-12);

  const [task, setTask] = useState({
    id,
    taskName: text,
    timer,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    setText('');
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='App'>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Enter task name'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTask({ id, timer: 0, taskName: text });
          }}
        />
        <button type='submit'>Create Task</button>
      </form>
      {tasks.length > 0 &&
        tasks.map((task) => {
          return (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          );
        })}
    </div>
  );
}

export default App;
