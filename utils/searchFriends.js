import React, {useState, useEffect} from 'react'
import {db, auth} from '../services/config'


function AddFriend() {
  
  const [friend, setFriend] = useState("");
  const [text, setText] = useState("");
  let ref = db.ref(`Users`);

  const handleText = (e) => {
      setText(e.target.value);
  }

  function handleSubmit(e)  {
      ref.once('value', (snapshot) => {
        let newFriend = "";
        snapshot.forEach(data => {
          if (data.val().email===text && data.val().email!==auth.currentUser.email)  {
            const newRef = db.ref(`Users/${auth.currentUser.uid}/friends/${data.val().uId}}`);
            newRef.update({email: data.val().email, name: data.val().name, password: data.val().password, uId: data.val().uId});
            setText("")
          }
          
        })
      },[]);
      setText("");
  }
}
export default AddFriend;

