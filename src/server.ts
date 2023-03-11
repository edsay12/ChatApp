import express from "express";
import App from "./App";



App.io.on('conection',(socket)=>{
    console.log('a user connected')
})


App.server.listen(8081,()=>{
    console.log('server iniciado na porta 8081')
});


