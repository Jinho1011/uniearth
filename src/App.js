import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Feed from "./routes/Feed";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

function App() {
  return (
    <Router>
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
