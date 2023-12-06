import React from "react";
import { BrowserRouter } from "react-router-dom/";
import PageBody from "./pages/PageBody";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PageBody />
      </BrowserRouter>
    </>
  );
};

export default App;
