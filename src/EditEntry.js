import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEntry = ({ updateEntry }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Cargar los datos de la tarea seleccionada
  useEffect(() => {
    axios.get(`http://localhost:3000/api/entries/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('Error loading entry:', error);
      });
  }, [id]);

    // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEntry = { title, content };

    // Enviar una solicitud PUT al servidor para actualizar la entrada con el id
    axios.put(`http://localhost:3000/api/entries/${id}`, updatedEntry)
      .then(response => {
        updateEntry(response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating entry:', error);
      });
  };

  return (
    <div className="container mx-auto py-6">
      {/* Titulo de la pagina */}
      <h2 className="text-center text-2xl mb-4">Editar tarea</h2>

      {/* Formulario para inresar titulo y descripcion que se quiere editar */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">Titulo:</label>
          <input type="text" id="title" className="w-full border px-2 py-1" placeholder="Ingresar titulo" value={title} onChange={(e) => setTitle(e.target.value)} required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-lg font-medium">Descripción:</label>
          <textarea id="body" className="w-full border px-2 py-1" rows="3" placeholder="Ingresar descripción" value={content} onChange={(e) => setContent(e.target.value)} required
          />
        </div>

        {/* Boton de guardar */}
        <button className="relative mt-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <span className="relative px-2 py- transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
            Guardar
          </span>
        </button>
      </form>
    </div>
  );
};

export default EditEntry;
