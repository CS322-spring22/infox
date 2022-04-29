import React, {useState} from 'react'
import FormSuccess from './FormSuccess'
import './Form.css';
import FormSignin from './FormSignin';

const FormSI = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    function submitForm() {
      setIsSubmitted(true);
    }
    return (
      <>
        <div className='form-container'>
          <span className='close-btn'>×</span>
          <div className='form-content-left'>
            {/* <img className='form-img' src='public/img/img-2.svg' alt='spaceship' /> */}
          </div>
          {!isSubmitted ? (
            <FormSignin submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </>
    );
  };
  
  export default FormSI;