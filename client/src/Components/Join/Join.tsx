import { useRef } from "react";
import io from "socket.io-client";

const Join = ({ setSocket ,setIsUser}: { setSocket: any,setIsUser:any }) => {
  const userNameRef: string | any = useRef<string>();
  const handleSubmit = async () => {
    const username: string = userNameRef.current.value;
    setIsUser(true)
    if (!username.trim()) return;
    const socket = await io("http://localhost:8081");
    socket.emit("setUserName", username);
    setSocket(socket);
    console.log(username);
  };
  return (
    <div>
      join
      <input type="text" ref={userNameRef} placeholder="Nome de usuario" />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};

export default Join;
