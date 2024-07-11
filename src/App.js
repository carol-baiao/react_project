import { useState, useEffect } from "react"; // importando useState e useEffect para
// manipularmos campos dinamicamente 

function App() {
  const [ taskName, setTaskName ] = useState('');
  const [ taskHour, setTaskHour ] = useState('');
  const [ taskResponsible, setTaskResponsible ] = useState('');

  const [ tasks, setTask ] = useState([]);

  function handleFormSubmit(event) {
    event.preventDefault();

    let tasksStorage = localStorage.getItem('@task');
    console.log("taskstorage",tasksStorage)

    if(tasksStorage) {
      tasksStorage = JSON.parse(tasksStorage)
    } else {
      tasksStorage = [];
    }
    
    const newTask = {
      name: taskName,
      hour: taskHour,
      responsible: taskResponsible,
    };

    // if(tasksStorage) {
    //   console.log("taskstorage", tasksStorage);
    //   tasksStorage.push(newTask)
    // }
    tasksStorage.push(newTask)

    console.log(newTask)

    setTask([...tasks, newTask]);
    
    console.log("tasks",tasks)
    localStorage.setItem('@task', JSON.stringify(tasksStorage)); 
    

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

  // useEffect(() => {
  //   console.log("aqui")
  //   localStorage.setItem('@task', JSON.stringify(tasks));
  // }, [tasks]);

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
          {tasks.map((tasks, index) => (
            <li key={index}>
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
