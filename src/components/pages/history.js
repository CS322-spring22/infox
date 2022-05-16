import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where, getDoc, deleteField, updateDoc, orderBy, limit } from 'firebase/firestore';
import "./history.css"

//array that contains all global history
const globalInput = [];
const globalOutput = [];

//array that contains user history
const hInput = [];
const hOutput = [];

function History(){
  //global inputs
  const [gInput1, setgInput1] = useState("");
  const [gInput2, setgInput2] = useState("");
  const [gInput3, setgInput3] = useState("");
  //global outputs
  const [gOutput1, setgOutput1] = useState("");
  const [gOutput2, setgOutput2] = useState("");
  const [gOutput3, setgOutput3] = useState("");
  
  //user inputs
  const [hInput1, sethInput1] = useState("");
  const [hInput2, sethInput2] = useState("");
  const [hInput3, sethInput3] = useState("");
  //user outputs
  const [hOutput1, sethOutput1] = useState("");
  const [hOutput2, sethOutput2] = useState("");
  const [hOutput3, sethOutput3] = useState("");


  const [user] = useAuthState(auth);
  
  let showHist = async (e) => {
    console.log("ShowHist pressed");
    if (!user){
      console.log("no user logged in");
      return;
    }
    const userID = user.uid; //get whoever is logged in
    //make query of users data
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!doc.data().history){
        console.log("no history yet");
      }
      else{
        doc.data().history.forEach(s => {
          console.log(s); //get all of history
          //input and output are a single string split by :
          var arr = s.split(":")
          //put those split things into their own arrays
          hInput.push(arr[0]);
          hOutput.push(arr[1]);
        });
      }
    });
    //assign them from arrays
    //get the last 3 elements from the array, since these are the 3 most recently added things
    sethInput1(hInput[hInput.length-1]);
    sethOutput1(hOutput[hInput.length-1]);
    sethInput2(hInput[hInput.length-2]);
    sethOutput2(hOutput[hInput.length-2]);
    sethInput3(hInput[hInput.length-3]);
    sethOutput3(hOutput[hInput.length-3]);
  }




  let clearHist = async (e) => {
    console.log("clearHist pressed");
    if (!user){
      console.log("no user logged in");
    }
    const userID = user[0].uid; //get whoever is logged in
    //make query of users data
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
    var docID;
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    const docRef = doc(db, "users", docID);
      await updateDoc(docRef,{
        history: deleteField()
      });
  }




  let showGlobal = async (e) => {
    console.log("ShowGlobal pressed");
    //get 3 most recent searches
    const q = query(collection(db, "gHistory"), orderBy("date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      console.log("input:\n" + doc.data().input + "\noutput:\n" + doc.data().output);
      //add them to global arrays
      if (globalInput.indexOf(doc.data().input === -1)){ //dunno if this if statement works
        globalInput.push(doc.data().input);
        globalOutput.push(doc.data().output)
      }
      //set the important variables
      setgInput1(globalInput[0]);
      setgOutput1(globalOutput[0]);
      setgInput2(globalInput[1]);
      setgOutput2(globalOutput[1]);
      setgInput3(globalInput[2]);
      setgOutput3(globalOutput[2]);
    });
    
  }




  return (
    <div className='form-container'>
      <div className='history-content-left'>
          <h1 className='form-header'>User History</h1>
          <button className="history-button-left" onClick={showHist}>
            Show User History
          </button>
          <button className="bottom-button" onClick={clearHist}>
            Clear History
          </button>
          <p className='history-text'>{hOutput1}</p>
          <h1 className='history-title'> {hInput1}</h1>
          <p className='history-text'>{hOutput2}</p>
          <h1 className='history-title'> {hInput2}</h1>
          <p className='history-text'>{hOutput3}</p>
          <h1 className='history-title'> {hInput3}</h1>
      </div>
      <div className='history-content-right'>
        <h1 className='form-header'> Global History</h1>
        <button className="history-button-right" onClick={showGlobal}>
          Show Global History
        </button>
        <p className='history-text'>{gOutput1}</p>
        <h1 className='history-title'> {gInput1}</h1>
        <p className='history-text'>{gOutput2}</p>
        <h1 className='history-title'> {gInput2}</h1>
        <p className='history-text'>{gOutput3}</p>
        <h1 className='history-title'> {gInput3}</h1>
      </div>
    </div>
  )
}

export default History;
