import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from 'axios'

export default function Auth() {

  const {
    username,
    secret,
    setUsername,
    setSecret
  } = useContext(Context);

  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    if (username.length === 0 || secret.length === 0) return;

    axios.put("https://api.chatengine.io/users/",
      { username, secret }, { headers: { "Private-key": "d0e20a3b-1329-464b-8cb2-12138c5fbc0a" } }
    ).then(r => {
      router.push("/chats");
    })

  }


  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={e => onSubmit(e)}>
          <div className="auth-title">NextJS Chat</div>

          <div className="input-container">
            <input placeholder="Email" className="text-input" onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-container">
            <input placeholder="Password" type="password" className="text-input" onChange={e => setSecret(e.target.value)} />
          </div>
          <button type="submit" className="submit-button">
            Login/Signup
          </button>
        </form>
      </div>
    </div>
  );
}
