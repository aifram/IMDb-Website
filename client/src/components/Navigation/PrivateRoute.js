import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import MyPage from "../MyPage";
import Search from "../Search";
import SignIn from "../SignIn";
import Landing from "../Landing";
import history from "./history";
import Reviews from "../Reviews";
export default function PrivateRoute({}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Home" exact component={Home} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/Search" exact component={Search} />
        <Route path="/MyPage" exact component={MyPage} />
        <Route path="/Reviews" exact component={Reviews} />
        <Route path="/" exact component={Landing} />
      </Switch>
    </Router>
  );
}

// import React from "react";
// import { Router, Switch, Route } from "react-router-dom";
// import Home from '../Home';
// import history from './history';

// export default function PrivateRoute({
//   //authenticated,
//   //...rest
// }) {
//   return (

//     <Router history={history}>
//       <Switch>
//       <Route path="/" exact component={Home} />
//       </Switch>
//     </Router>
//   );
// }
