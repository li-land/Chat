import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./components";
import "./App.css";

const App: FC = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
