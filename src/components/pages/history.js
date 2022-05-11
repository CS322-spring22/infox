import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where, getDoc, deleteField, updateDoc, orderBy, limit } from 'firebase/firestore';


function History(){
  
  const user = useAuthState(auth);
  
  let showHist = async (e) => {
    console.log("ShowHist pressed");
    if (!user){
      console.log("no user logged in");
    }
    const userID = user[0].uid; //get whoever is logged in
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
        });
      }
    });
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
    const q = query(collection(db, "gHistory"), orderBy("date"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("input:\n" + doc.data().input + "\noutput:\n" + doc.data().output);
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
    </div>
    
  )
}

export default History;