import "./App.css";
import React, {useState} from "react";
import Navbar from "./components/navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  let apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0); // [state, setState
  const setNewProgress = (recentProgress) => {
    setProgress(recentProgress);
  };
  return (
    <div>
      <BrowserRouter>
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setNewProgress}
                key="general"
                category={"general"}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setNewProgress}
                key="business"
                category={"business"}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setNewProgress}
                key="health"
                category={"health"}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setNewProgress}
                key="science"
                category={"science"}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setNewProgress}
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
                setProgress={setNewProgress}
                key="technology"
                category={"technology"}
              />
            }
          />
          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setNewProgress}
                key="general"
                category={"general"}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;