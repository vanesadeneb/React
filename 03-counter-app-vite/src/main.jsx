import React from "react";
import ReactDOM from "react-dom/client";
import { CounterApp } from "./CounterApp";
//import { HelloWorldApp } from "./HelloWorldApp";
//import { FirstApp } from "./FirstApp";
import "./style.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CounterApp value={234}/>
    </React.StrictMode>
);