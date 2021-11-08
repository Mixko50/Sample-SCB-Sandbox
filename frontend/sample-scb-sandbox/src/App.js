import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
require("dotenv").config();

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/callback">
                            <Callback />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
