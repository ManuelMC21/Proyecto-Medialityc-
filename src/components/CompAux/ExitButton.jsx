import XExitButton from '../../assets/svgC/XExitButton';

import '../../styles/z-comun/buttons.css'
function ExitButton({handleClick}){
  return(
    <button className='exit-button' onClick={handleClick}>
      <XExitButton color={'red'}/>
    </button>
  );
}

export default ExitButton