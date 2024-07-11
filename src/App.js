import { useState, useEffect } from "react"; // importando useState e useEffect para
// manipularmos campos dinamicamente 

function App() {
  const [ taskName, setTaskName ] = useState('');
  const [ taskHour, setTaskHour ] = useState('');
  const [ taskResponsible, setTaskResponsible ] = useState('');

  const [ tasks, setTask ] = useState([]);

  function handleFormSubmit(event) {
    event.preventDefault(); 

    const newTask = {
      name: taskName,
      hour: taskHour,
      responsible: taskResponsible,
    };

    setTask([...tasks, newTask]);

    setTaskName('');
    setTaskHour('');
    setTaskResponsible('');
  }

  useEffect(() => {
    const tasksStorage = localStorage.getItem('@task');

    if(tasksStorage) {
      setTask(JSON.parse(tasksStorage));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('@task', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div >
      <h1>Tasks Note</h1>
      <h2>hi there! here's a small app to help you take note and remember your tasks!</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Task: </label>
        <input placeholder="tap the task"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}></input>
        <br />

        <label>Hour: </label>
        <input placeholder="tap the hour"
        value={taskHour}
        onChange={(event) => setTaskHour(event.target.value)}></input>
        <br />

        <label>Responsible: </label>
        <input placeholder="tap the responsible"
        value={taskResponsible}
        onChange={(event) => setTaskResponsible(event.target.value)}></input>
        <br />

        <button type="submit">Save</button>
      </form>

      <div>
        <ul>
          {tasks.map(tasks => (
            <li key={tasks}>
            Task: {tasks.name}
            <br />
            Hour: {tasks.hour}
            <br />
            Responsible: {tasks.responsible}
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
