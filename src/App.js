import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Feed from "./routes/Feed";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

function App() {
  let isAuthorized = sessionStorage.getItem("JWT");

  return (
    <Router>
      {!isAuthorized ? <Redirect to="/login" /> : <Redirect to="/" />}

      <Switch>
        <Route path="/" exact component={Feed}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
        <Route path="/user/:id" exact component={Profile}></Route>
      </Switch>
    </Router>
  );
}

export default App;
