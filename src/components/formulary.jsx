import React, { useState } from 'react';

import '../styles/formulary.css';
import '../styles/aux-styles.css';

function Formulary({ setFormOpened, addRestaurant }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const newRestaurant = {
      id: Date.now(),
      name,
      phone,
      type,
      description,
    };
    console.log(newRestaurant);

    addRestaurant(newRestaurant);
    setFormOpened(false);
    setName('');
    setPhone('');
    setType('');
    setDescription('');
  };

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

      <button className="close-button " onClick={() => setFormOpened(false)}>X</button>

      <label className="title">Add a place</label>
      <div className="content">
        <div className="details">
          <label className="label-details">Details</label>
          <p className="info-details">Provide information about this site. If the site is added to Maps, it will be displayed publicly.</p></div>

        <div className="block-input">
          <label className='input-label' htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            value={name}
            className="formulary-input"
            placeholder="Enter a Name"

            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="block-input">
          <label className='input-label' htmlFor="classification">Category:</label>
          <CategorySelect
          onChange={setType}
          />
        </div>

        <div className="block-input">
          <label className='input-label' htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            value={description}
            className="formulary-input"
            placeholder="Enter a description"

            onChange={(e) => setDescription(e.target.value)}
            required


          />
        </div>
        <div className="block-input">
          <label className='input-label' htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            className="formulary-input"
            placeholder="Phone number"
            pattern="\d{4}-\d{4}"
            title="Formato: 9999-9999"
            required

            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            
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
            Main image:
            {image ? (
              <img src={image} alt="preview" className="image-preview" />
            ) : (
              <img src="https://via.placeholder.com/150" alt="No Image" className="image-preview" />
            )}
          </label>


        </div>

      </div>
      <div className="formulary-button-container">
        <button className="formulary-button">Cancel</button>
        <button
          className="formulary-button" type="submit"> Send</button>
      </div>

    </form>
  );
}

const CategorySelect = ({onChange}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value) => {
    setSelectedOption(value);
    onChange(value); 
    setIsOpen(false); 
  };

  return (
    <div className="formulary-select">
      <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
        <div className="selected">{selectedOption || 'Category'}</div>
        {isOpen && (
          <div className="options">
            <div className="option" onClick={() => handleChange('Restaurant')}>Restaurant</div>
            <div className="option" onClick={() => handleChange('Hospital')}>Hospital</div>
            <div className="option" onClick={() => handleChange('School')}>School</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulary;
