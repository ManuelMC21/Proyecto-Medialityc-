import '../../styles/z-comun/field.css'

function Field({ placeholder, visible = true, handleChange, value }) {

  return (
    <div className='field'>
      <input
        className='field-input'
        type="text"
        placeholder=" "
        value={value}
        onChange={handleChange}
      />
      <label className='floating-label'>{placeholder}</label>
      {!visible && (
        <button className='text-button visible-button'>0</button>
      )}
    </div>
  );
}

export default Field