import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import TvShow from "./Routes/TvShow";
import Search from "./Routes/Search";
import Header from "./Components/Header";


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path={["/tvshow", "/tvshow/:id"]}>
          <TvShow />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/:id"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
