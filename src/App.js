import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: this.state.progress });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            height={3}
          />
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  category={"general"}
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  category={"business"}
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  category={"health"}
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  apiKey = {this.apiKey}
                  category={"science"}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  category={"sports"}
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  category={"technology"}
                  apiKey = {this.apiKey}
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  category={"general"}
                  apiKey = {this.apiKey}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
