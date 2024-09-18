import React, { useState } from 'react';
import axios from 'axios';


const NewEntry = ({ addEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

    // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Crear un nuevo objeto que es una nueva tarea
    const newEntry = {
      title,
      content,
      published: new Date().toISOString() 
    };

     // Enviar una solicitud POST al servidor para insertar nueva tarea
    axios.post('http://localhost:3000/api/entries', newEntry)
      .then(response => {
        addEntry(response.data);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding entry:', error);
      });
  };

  return (
    <div className="container mx-auto py-6">

    {/* Titulo de la pagina */}
      <h2 className="text-center text-2xl mb-4">Agrega una nueva tarea</h2>
      
      {/* Formulario para inresar titulo y descripcion de la tarea */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">Titulo:</label>
          <input type="text" id="title" className="w-full border px-2 py-1" placeholder="Ingresar titulo" value={title} onChange={(e) => setTitle(e.target.value)} required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-lg font-medium">Texto de la tarea o descripción</label>
          <textarea id="body" className="w-full border px-2 py-1" rows="3" placeholder="Ingresar descripción" value={content} onChange={(e) => setContent(e.target.value)} required
          />
        </div>

        {/* Boton de guardar */}
        <div className="mb-4">
          <button
            className="relative mt-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleSubmit}
          >
            <span className="relative px-2 py- transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
              Guardar
            </span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewEntry;
