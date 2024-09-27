import React, { useState } from 'react';
import '../css/styles.css';


function Socials(){
    return(
      <div className='c'>
        <div className="social-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
        <img src="client/src/assets/facebook.jpg" className="fab fa-facebook" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src='./assets/instagram.jpg' className="fab fa-instagram" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src='../assets/twitter.jpg' className="fab fa-twitter" />
        </a>
      </div>
      </div>
    );
}




function Connect(){

    const [contactData, setContactData] = useState({
        Name: "",
        Email: "",
        Message: "",
      });

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) =>{
      e.preventDefault();
        if(contactData.Name.length>1 &&  contactData.Email.length>1 && contactData.Message.length>1){
          alert("Thanks for reaching out, we appreciate your communication.")
        }else{
          alert("WOW, 1 letter. we appreciate the ingenuity but please input a longer one")
        }
    }



    return(
        <div className='center'>
            <h1> Send us a Message</h1>

            <form className="form contact-form" onSubmit={handleSubmit}>
                <input
                className="input"
                type="text"
                name="Name"
                value={contactData.Name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                />
                <input
                className="input"
                type="email"
                name="Email"
                value={contactData.Email}
                onChange={handleChange}
                placeholder="Example@email.com"
                required
                />
                <textarea
                className="input"
                type="text"
                name="Message"
                cols={20}
                rows={8}
                value={contactData.Message}
                onChange={handleChange}
                placeholder="....."
                required
                />

                <button 
                type='submit'
                onClick={handleSubmit}>
                    Submit
                </button>
        </form>

        <h1>Or Visit us @</h1>
        <Socials />

            
        </div>
    );
}

export default Connect;