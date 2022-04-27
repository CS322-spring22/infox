import { render } from '@testing-library/react';
import React, { useState } from "react";
import SignUp from './signup';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';

/*
const Home = () => {
    return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40vh',
          color: 'white'
          }}
      >
      <NameForm>

      </NameForm>
      </div>
    )
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    console.log("text to summarize: " + this.state.value);
    event.preventDefault();
    const r = fetch("/model", {  
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'text': this.state.value})
    }).then((response) => response.json())
    .then((data) => {
      //console.log(data); //this shows the dictionary with key and response
      return(data['summary_text']); //this shows just the response
    });

    const showAlert = () => {
      r.then((a) => {
        alert(a)
      });
    }
    showAlert();
    //alert('A name was submitted: ' + this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Submit article here:
          <p></p>
          <textarea type="text" rows={5} cols={40} value={this.state.value} onChange={this.handleChange} />
        </label>
        <p></p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
*/
function SendSummary(){
  const [summaryText, setSummaryText] = useState("");
  const [user] = useAuthState(auth)
  var loggedIn = true;
  let handleSubmit = async (e) => {
    if (!user){
      console.log("no user logged in");
      loggedIn = false;
    }
    e.preventDefault();
    console.log(JSON.stringify({'text': summaryText, 'loggedIn': loggedIn}));
    const r = fetch("/model", {  
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'text': summaryText, 'loggedIn': loggedIn})
    }).then((response) => response.json())
    .then((data) => {
      //console.log(data); //this shows the dictionary with key and response
      return(data['summary_text']); //this shows just the response
    });

    const showAlert = () => {
      r.then((a) => {
        alert(a)
      });
    }
    showAlert();
  };


  return(
    <div className="input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={summaryText}
          onChange={(e) => setSummaryText(e.target.value)}
          placeholder="Enter some summary"
        />
        <button className="input__btn">
          Input
        </button>
      </form>
    </div>
  )
}

//export default Home;
export default SendSummary;
