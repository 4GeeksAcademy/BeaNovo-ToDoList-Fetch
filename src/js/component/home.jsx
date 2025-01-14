import React, { useState, useEffect } from "react";

const Home = () => {
  // Estado que almacena las tareas
  const [listElement, setListElement] = useState([]);

  // Hook de efecto que se ejecuta al cargar el componente por primera vez
  useEffect(() => {
    getTask(); // Llama a la función para obtener las tareas desde la API
  }, []);

  // Función para crear un nuevo usuario en la API
  const createUser = async () => {
    const requestOptions = {
      method: "POST", // Método POST para crear recursos
      headers: {
        "content-type": "application/json", // Indica que el cuerpo es JSON
      },
      body: JSON.stringify([]), // Envía un array vacío como cuerpo de la solicitud
    };

    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/Bea", requestOptions);
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error
        throw new Error("errores de solicitud");
      }
      const data = await response.json();
      console.log("Usuario creado:", data); // Muestra el resultado en la consola
    } catch (err) {
      console.error("Error al crear el usuario:", err); // Manejo de errores
    }
  };

  // Función para obtener todas las tareas de la API
  const getTask = async () => {
    const requestOptions = {
      method: "GET", // Método GET para leer recursos
      redirect: "follow",
    };

    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/Bea", requestOptions);
      if (!response.ok) {
        // Si no existe el usuario, lo crea y lanza un error
        createUser();
        throw new Error("errores de solicitud");
      }
      const data = await response.json();
      setListElement(data.todos); // Actualiza el estado con las tareas obtenidas
    } catch (err) {
      console.error("Error al obtener las tareas:", err); // Manejo de errores
    }
  };

  // Función para añadir una nueva tarea
  const handleNewTask = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json"); // Especifica que el contenido es JSON

      const raw = JSON.stringify({
        label: e.target.value, // Tarea introducida por el usuario
        is_done: false, // Marca la tarea como no completada
      });

      const requestOptions = {
        method: "POST", // Método POST para añadir una nueva tarea
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://playground.4geeks.com/todo/todos/Bea", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar la tarea");
          }
          return response.json();
        })
        .then((result) => {
          // Actualiza la lista local y limpia el input
          setListElement([...listElement, result]); // Añade la nueva tarea al estado
          e.target.value = ""; // Vacía el campo de texto
          getTask(); // Refresca las tareas desde la API
        })
        .catch((error) => console.error("Error:", error)); // Manejo de errores
    }
  };

  // Función para eliminar una tarea
  const handleClick = (eliminarIndice, id) => {
    const requestOptions = {
      method: "DELETE", // Método DELETE para eliminar un recurso
      redirect: "follow",
    };

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la tarea");
        }
        // Filtra la tarea eliminada en el estado local
        const newList = listElement.filter((item) => item.id !== id); // Elimina la tarea correspondiente
        setListElement(newList); // Actualiza el estado con la nueva lista
      })
      .catch((error) => console.error("Error al eliminar la tarea:", error)); // Manejo de errores
  };

  // Renderiza el componente
  return (
    <div className="container display-5 d-flex flex-column align-items-center">
      <h1>todos</h1>

      <div className="input-container w-50 display-5">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          onKeyDown={handleNewTask} // Llama a la función al presionar Enter
        />
      </div>

      <ul className="task-list w-50">
        {listElement.map((element, index) => (
          <li key={element.id} className="task-item">
            {element.label}
            <button
              className="delete-btn"
              onClick={() => handleClick(index, element.id)} // Llama a la función para eliminar la tarea
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <div className="task-footer w-50">
        <span>{listElement.length} Pending tasks</span> {/* Muestra el número de tareas pendientes */}
      </div>
    </div>
  );
};

export default Home;




