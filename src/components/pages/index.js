import { render } from '@testing-library/react';
import React, { useState } from "react";
import SignUp from './signup';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../firebase';
import './index.css'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

/*
const Home = () => {
    return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
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
  // [] AROUND USER IS IMPORTANT
  const [user] = useAuthState(auth)
  var loggedIn = true;
  var docRef;
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (!user){
      console.log("no user logged in");
      loggedIn = false;
    }
    else{
      //add to history
      const userID = user.uid; //get whoever is logged in
      console.log(userID); 
      
      //look for all documents
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      var docID = "";
      //should only be one per user, get its docID
      docs.forEach((doc) => {
        docID = doc.id;
      })
      
      //with that docID, update the doc
      docRef = doc(db, "users", docID);
      
    }
    console.log(JSON.stringify({'text': summaryText, 'loggedIn': loggedIn}));
    const r = fetch("https://avganshina.pythonanywhere.com/model", {
    //const r = fetch("/model", { 
      method: 'POST', 

      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'text': summaryText, 'loggedIn': loggedIn})
    }).then((response) => response.json())
    .then((data) => {
      console.log(data); //this shows the dictionary with key and response
      return(data['summary_text']); //this shows just the response
    });

    const showAlert = () => {
      r.then((a) => {
        //show output
        alert(a)
        //update user history
        updateDoc(docRef,{
          history: arrayUnion(summaryText + " : " + a) //put the summary text and the result in the database
        });
        //update global history
        addDoc(collection(db, "gHistory"), {
          input: summaryText,
          output: a,
          date: new Date()
        });
      });
    }
    showAlert();
  };


  return(
    <div className="form-box">
      <h5 className='form-step'>InfoX Article Summariser</h5>
      <form onSubmit={handleSubmit}>
        <div className="field1">
          <label>Word Limit: 200</label>
          <textarea
              type="text"
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              placeholder="Paste Article"
            />
            <button className="input_btn">
              Submit
            </button>
        </div>
      </form>
    </div>
  )
}

//export default Home;
export default SendSummary;

