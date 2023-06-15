import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={<News key="general" category={"general"} />}
            />
            <Route
              exact
              path="/business"
              element={<News key="business" category={"business"} />}
            />
            <Route
              exact
              path="/health"
              element={<News key="health" category={"health"} />}
            />
            <Route
              exact
              path="/science"
              element={<News key="science" category={"science"} />}
            />
            <Route
              exact
              path="/sports"
              element={<News key="sports" category={"sports"} />}
            />
            <Route
              exact
              path="/technology"
              element={<News key="technology" category={"technology"} />}
            />
            <Route
              exact
              path="/general"
              element={<News key="general" category={"general"} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
