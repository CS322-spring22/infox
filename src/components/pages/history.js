import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where, getDoc, deleteField, updateDoc, orderBy, limit } from 'firebase/firestore';

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
    <div>
        <h1>Print</h1>
        <button className="login__btn login__google" onClick={showHist}>
          Show History
        </button>
        <h1> Clear</h1>
        <button className="login__btn login__google" onClick={clearHist}>
          Clear History
        </button>
        <h1> Global History</h1>
        <button className="login__btn login__google" onClick={showGlobal}>
          Show Global History
        </button>
        <h1>Global History</h1>
        <h1> {gInput1}</h1>
        <p>{gOutput1}</p>
        <h1> {gInput2}</h1>
        <p>{gOutput2}</p>
        <h1> {gInput3}</h1>
        <p>{gOutput3}</p>
        
        <h1>User History</h1>
        <h1> {hInput1}</h1>
        <p>{hOutput1}</p>
        <h1> {hInput2}</h1>
        <p>{hOutput2}</p>
        <h1> {hInput3}</h1>
        <p>{hOutput3}</p>
    </div>
  )
}

export default History;