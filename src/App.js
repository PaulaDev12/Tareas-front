import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import NewEntry from './NewEntry';
import Entries from './Entries';
import EditEntry from './EditEntry';
import axios from 'axios';


const App = () => {
  const [entries, setEntries] = useState([]);

  // Cargar los datos de las tareas creadas
  useEffect(() => {
  // Enviar una solicitud GET al servidor para mostrar las tareas
    axios.get('/api/entries')
      .then(response => {
        console.log('Fetched entries:', response.data);
        setEntries(response.data);
      })
      .catch(error => console.error('Error fetching entries:', error));
  }, []);

// Sirve para actualizar una tarea específica en la lista de tareas
  const updateEntry = (updatedEntry) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };
  
  const addEntry = (newEntry) => {
  // Enviar una solicitud POST al servidor para insertar nueva tarea
    axios.post('http://localhost:3000/api/entries', newEntry)
      .then(response => setEntries(prevEntries => [...prevEntries, response.data]))
      .catch(error => console.error('Error adding entry:', error));
};

  return (
    <Router>
      <Header />
      <Routes>
        {/* Ruta principal */}
      <Route path="/" element={<Entries entries={entries} setEntries={setEntries} />} />
        {/* Ruta de interfaz para crea nueva tarea */}
      <Route path="/new-entry" element={<NewEntry addEntry={addEntry} />} />
        {/* Ruta de interfaz para editar tarea */}
      <Route path="/edit-entry/:id" element={<EditEntry updateEntry={updateEntry} />} />
      </Routes>
    </Router>
  );
};

export default App;
