import React, { useEffect, useRef, useState } from "react";

const Chat = ({ socket }: { socket: any }) => {
  const mensageRef: string | any = useRef<string>();
  const [messageList, setMessageList] = useState<[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (data: any) => {
      setMessageList(current => [...current,data]);
      console.log(messageList);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  const handleSubmit = () => {
    const message: string = mensageRef.current.value;
    if (!message.trim()) {
      return;
    }
    socket.emit("message", message);
    console.log("kak");
    mensageRef.current.value = "";
  };
  return (
    <div>
      chat
      <input type="text" ref={mensageRef} placeholder="Mensagem" />
      <button onClick={handleSubmit}>Enviar</button>
      <div className="messages">
        {messageList.map((message) => {
          return (
            <div className="messages">
                <h1>{message.author}</h1>
                <p>{message.message}</p>


            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Chat;
