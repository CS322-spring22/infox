import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from "react";
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
import LoadingSpinner from '../loading';


function SendSummary(){
  const [summaryText, setSummaryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    console.log(JSON.stringify({'text': summaryText, 'loggedIn': loggedIn}));
    const r = fetch("https://avganshina.pythonanywhere.com/model", {
    //const r = fetch("/model", { 
      method: 'POST', 

      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'text': summaryText, 'loggedIn': loggedIn})
    }).then((response) => response.json())
    .then((data) => {
      console.log(data); //this shows the dictionary with key and response
      setIsLoading(false); //pseudo works here
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
        //TODO
        //remove oldest Global History here to prevent database bloating
      });
    }
    showAlert();
  };

  const [characterCount, setCharacterCount] = useState(0);
  const genRender = (
    <div className="form-box">
      <h5 className='form-step'>InfoX Article Summariser</h5>
      <form onSubmit={handleSubmit}>
        <div className="field1">
          <label>Word Limit: 200</label>
          <textarea
              type="text"
              value={summaryText}
              onChange={(e) => { setCharacterCount(e.target.value.length); setSummaryText(e.target.value)}}
              placeholder="Paste Article"
            />
            <p className='text'>Characters: {characterCount}</p>
            <button className="input_btn" disabled={isLoading}>
              Submit
            </button>
            </div>
      </form>
      <p>"hello"</p>
    </div>
  )
  return(
    <div>
      {isLoading ? <LoadingSpinner/>: genRender}
    </div>
  )
}

//export default Home;
export default SendSummary;
