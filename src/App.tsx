import React from "react";
import "./App.css";
import { Footer, Header } from "antd/es/layout/layout";
import { BrowserRouter, Route, Link } from "react-router-dom";
import button from "./components/button/button-base";
const NavigationBar = () => {
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };

  return <Header style={headerStyle}>Header</Header>;
};

const FooterBar = () => {
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };
  return <Footer style={footerStyle}>Footer</Footer>;
};
function App() {
  return (
    <BrowserRouter>
      <div >
        <Route path="/" Component={NavigationBar} />
        <Route path="/" Component={FooterBar} />
      </div>
    </BrowserRouter>
  );
}

export default App;
