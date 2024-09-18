import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Entries = ({ entries, setEntries }) => {

  // Función para manejar el clic en el botón de completado
  const handleCompleteToggle = (id) => {
    axios.patch(`http://localhost:3000/api/entries/${id}/toggle`)
      .then(response => {
        setEntries(prevEntries =>
          prevEntries.map(entry =>
            entry.id === id
              ? { ...entry, completed: response.data.completed }
              : entry
          )
        );
      })
      .catch(error => console.error('Error toggling completion status:', error));
  };

  // Función para manejar el clic en el botón de eliminar
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/entries/${id}`)
      .then(() => {

        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
      })
      .catch(error => console.error('Error deleting entry:', error));
  };


  return (

    <div className="container mx-auto py-6">

      {/* Titulo de la pagina principal */}
      <div className="flex  items-center justify-center mx-auto py-6">
        <h2 className="text-center text-2xl mb-4">Tareas</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>
      </div>

      {/* Titulos del contenido */}
      <thead class="flex justify-center items-center text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-800">
        <tr>
          <th scope="col" class="px-8 py-3">
            Tareas creadas
          </th>
          <th scope="col" class="pl-64 py-3">
            Botones de accion
          </th>
        </tr>
      </thead>

      <ul>
        {entries.map(entry => (
          <div className="flex justify-center items-center p-4 bg-gray-100 " key={entry.id}>

      {/* Contenido de tareas creadas */}
            <ul className="w-96 text-sm font-medium text-gray-900 hover:bg-gray-500 bg-white border border-gray-200 rounded-lg dark:bg-gray-400 dark:border-gray-600 dark:text-gray-800">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 p-2 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{entry.title}</h3>
                  <p className="mb-1">{entry.content}</p>
                  <p className="mb-1">Fecha de publicación: <small className="text-yellow-800">{new Date(entry.published).toLocaleDateString()}</small></p>
                  <p>Estado: <small className={`${entry.completed ? 'text-green-800' : 'text-red-700'}`}>{entry.completed ? 'Tarea completada' : 'Tarea no completada'}</small></p>
                </div>
              </li>
            </ul>

      {/* Botones de acción */}
            <div className="pl-20 flex justify-center items-center">

            {/* Boton de completar tarea */}
              <button
                className="relative m-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-green-600 dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                onClick={() => handleCompleteToggle(entry.id)}
              >
                <span className="relative px-2 py-1 transition-all ease-in duration-75 ">
                  {entry.completed ? (   
                    <svg
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"className="size-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </span>
              </button>

            {/* Boton de editar tarea */}
              <button
                className="relative mt-6 flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group  from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-green-600 dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
              >
                <Link to={`/edit-entry/${entry.id}`} className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                  Editar
                </Link>
              </button>

            {/* Boton de eliminar tarea */}
              <button
                className="relative mt-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-red-400 dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                onClick={() => handleDelete(entry.id)}
              >
                <span className="relative px-2 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Entries;
