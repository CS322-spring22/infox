import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { collection, doc, getDocs, setDoc, addDoc, query, where } from 'firebase/firestore';

function History(){
  const user = useAuthState(auth);
  let Clicked = async (e) => {
    console.log("button pressed");
    if (!user){
      console.log("no user logged in");
    }
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("users","==","EZU4Ts8H9vR4XtDWGl4g"));
    console.log(q);
    
    
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

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