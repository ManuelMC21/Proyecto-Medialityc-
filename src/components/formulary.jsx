import React, { useEffect, useState } from 'react';
import { fetchEntities } from '../data/functions';

import '../styles/formulary.css';
import '../styles/z-comun/aux-styles.css';
import { createRestaurant, createEntity, createImage } from '../data/functions';

function Formulary({ setFormOpened, addRestaurant, setMarkers, markers }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    let errorMessage = '';

    if (name === '') {
        isValid = false;
        errorMessage += "El nombre es obligatorio. ";
    }
    if (description === '') {
        isValid = false;
        errorMessage += "La descripción es obligatoria.";
    }

    if (isValid) {
        try {
            // Obtener la posición del último marcador
            const lastMarkerIndex = markers.length - 1;
            const lastMarker = markers[lastMarkerIndex];
            const latitude = lastMarker ? lastMarker.position[0] : 0; // latitud
            const longitude = lastMarker ? lastMarker.position[1] : 0; // longitud

            // Crear la entidad
            let response = await createEntity({
                "districtId": 1,
                "longitude": longitude,
                "latitude": latitude,
                "entityTypeId": type
            });

            if (response && response.retId) {
                await createRestaurant({
                    "restaurantId": response.retId,
                    "name": name,
                    "description": description,
                    "entityId": response.retId
                });

                if (image != null) {
                    await createImage({
                        "id": response.retId,
                        "image": image,
                    });
                }

                // Actualizar el marcador existente con el nuevo ID
                setMarkers((prevMarkers) => {
                    const updatedMarkers = [...prevMarkers];
                    if (lastMarkerIndex >= 0) {
                        updatedMarkers[lastMarkerIndex] = {
                            ...updatedMarkers[lastMarkerIndex],
                            id: response.retId // Asignar nuevo ID al último marcador existente
                        };
                    }
                    return updatedMarkers; // Retornar los marcadores actualizados
                });

                setFormOpened(false); // Cerrar el formulario
                resetForm(); // Reiniciar el formulario
            }
        } catch (error) {
            console.error("Error al recibir imagen", error);
        }
    } else {
        console.log("Error:", errorMessage);
    }
};

  const handleCancel = () => {
    if (markers.length > 0) {
      setMarkers(prevMarkers => prevMarkers.slice(0, -1));
    }
    resetForm();
    setFormOpened(false);
  }

  const resetForm = () => {
    setName('');
    setPhone('');
    setType('');
    setDescription('');
    setImage(null);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <form className="formulary" onSubmit={handleSubmit}>

      <button className="close-button " onClick={handleCancel}>X</button>

      <label className="title">Añade un lugar</label>
      <div className="content">
        <div className="details">
          <label className="label-details">Details</label>
          <p className="info-details">Añade información sobre este sitio. Si el sitio es añadido al mapa, sera visible para otras personas</p></div>

        <div className="block-input">
          <label className='input-label' htmlFor="Name">Nombre:</label>
          <input
            type="text"
            id="Name"
            value={name}
            className="formulary-input"
            placeholder="Entre un nombre"

            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="block-input">
          <label className='input-label' htmlFor="classification">Categoría:</label>
          <CategorySelect
            onChange={setType}
          />
        </div>

        <div className="block-input">
          <label className='input-label' htmlFor="description">Descripción:</label>
          <textarea
            type="text"
            id="description"
            value={description}
            className="formulary-input"
            placeholder="Entre una descripción"

            onChange={(e) => setDescription(e.target.value)}
            required
          />

        </div>

        <div className="image-upload-container">
          <input
            type="file"
            id="image-upload"
            className="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload" className="upload-label">
            Imagen principal:
            {image ? (
              <img src={image} alt="preview" className="image-preview" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="Sin imagen" className="image-preview" />
            )}
          </label>


        </div>

      </div>
      <div className="formulary-button-container">
        <button className="formulary-button" onClick={handleCancel}>Cancelar</button>
        <button
          className="formulary-button" onClick={handleSubmit}> Enviar</button>
      </div>

    </form>
  );
}

const CategorySelect = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [entitiesTypes, setEntitiesTypes] = useState([]);

  useEffect(() => {
    const getEntities = async () => {
      const fetchedEntities = await fetchEntities();
      if (fetchedEntities) {
        setEntitiesTypes(fetchedEntities);
      }
    };

    getEntities();
  }, []);

  const handleChange = (entityType) => {
    setSelectedOption(entityType.name);
    onChange(entityType.entityTypeId);
    setIsOpen(false);
  };

  return (
    <div className="formulary-select">
      <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
        <div className="selected">{selectedOption || 'Categorías'}</div>
        {isOpen && (
          <div className="options">
            {entitiesTypes.map((entity) => (
              <div
                key={entity.entityTypeId}
                className="option"
                onClick={() => handleChange(entity)}
              >
                {entity.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulary;
