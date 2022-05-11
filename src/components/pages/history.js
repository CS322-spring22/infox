import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where, getDoc, deleteField, updateDoc } from 'firebase/firestore';


function History(){
  
  const user = useAuthState(auth);
  
  let showHist = async (e) => {
    console.log("button pressed");
    if (!user){
      console.log("no user logged in");
    }
    const userID = user[0].uid; //get whoever is logged in
    //make query of users data
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      doc.data().history.forEach(s => {
        console.log(s); //get all of history
      });
    });
  }




  let clearHist = async (e) => {
    console.log("button pressed");
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




  /*
  let showGlobal = async (e) => {
    console.log("button pressed");
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
  */



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
    </div>
    
  )
}

export default History;