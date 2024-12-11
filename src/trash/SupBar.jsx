import '../styles/sup-bar.css'; 
import SingAndLog from './SingAndLog';

function SupBar(){
  return(
    <header className='sup-bar'>
      <div className='left-part'>
        <img className='logo-image' src="https://via.placeholder.com/30" alt="Web Logo"  width="30" height="30"></img>
        <p className='web-name'>
          Open Track
        </p>

      </div>
      
      <div className='right-part'>
      
        <SingAndLog />
      </div>

    </header>
  );
}
/*
<select className='select-more'>
          <option value="primero"> primero </option>
          <option value="segundo"> segundo </option>
        </select>
        */
export default SupBar