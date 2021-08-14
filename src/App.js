import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Feed from "./routes/Feed";
import Profile from "./routes/Profile";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import Main from "./routes/Main";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Main} path="/" exact />
        <PublicRoute
          restricted={true}
          component={SignUp}
          path="/register"
          exact
        />
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PrivateRoute component={Feed} path="/feed" exact />
        <PrivateRoute component={Profile} path="/profile" exact />
      </Switch>
    </Router>
  );
}

export default App;
