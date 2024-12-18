import React, { useState } from "react";

const Home = () => {
  const [listElement, setListElement] = useState([]);
 
  const handleNewTask = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setListElement([...listElement, e.target.value]);
      e.target.value = "";
      
    }
  };
  const handleClick = (eliminarIndice) => {
    const newLi = listElement.filter ((_, linea) => linea !== eliminarIndice);
      // {
      // return e.target.parentElement.firstChild.textContent !== element;
      //   });
    setListElement(newLi);
  };
  return (
    <div className="container display-5 d-flex flex-column align-items-center">
  <h1>todos</h1>

  
  <div className="input-container w-50 display-5">
    <input
      type="text"
      className="task-input"
      placeholder="What needs to be done?"
      onKeyDown={handleNewTask}
    />
  </div>

 
  <ul className="task-list w-50">
    {listElement.map((element, linea) => (
      <li key={linea} className="task-item">
        {element}
        <button className="delete-btn" onClick={() => handleClick(linea)}>x</button>
      </li>
    ))}
  </ul>

  
  <div className="task-footer w-50">
    <span>{listElement.length} Pending tasks</span>
  </div>
</div>
  );
};
export default Home;



