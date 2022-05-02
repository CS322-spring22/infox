import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where, getDoc } from 'firebase/firestore';

function History(){
  const user = useAuthState(auth);
  let Clicked = async (e) => {
    console.log("button pressed");
    if (!user){
      console.log("no user logged in");
    }
    const docRef = doc(db, "users", "EZU4Ts8H9vR4XtDWGl4g");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); //get doc
      docSnap.data().History.forEach(s => {
        console.log(s);
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }

  return (
    <div>
        <h1>History</h1>
        <button className="login__btn login__google" onClick={Clicked}>
          push me
        </button>
    </div>
    
  )
}

export default History;