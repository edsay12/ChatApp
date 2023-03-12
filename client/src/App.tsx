import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";
import { useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<any>();
  const [isUser, setIsUser] = useState(false);
  console.log(isUser)
  return (
    <div className="App">
      {isUser ? (
        <Chat socket={socket} />
      ) : (
        <Join setSocket={setSocket} setIsUser={setIsUser} />
      )}
    </div>
  );
}

export default App;
