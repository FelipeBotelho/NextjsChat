import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  }, [])

  useEffect(() => {
    if (username === "" || secret === "") {
      router.push("/");
    }
  }, [username, secret]);

  if (!showChat) return <div />
  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID="3e20e6ca-e03e-43b6-9e10-170e5a5ed357"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
