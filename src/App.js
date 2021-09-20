// import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";

import { ToastProvider } from "react-toast-notifications";
import { CarsProvider } from "./contexts/CarsContext";
import { DriversProvider } from "./contexts/DriversContext";

import Home from "./pages/Home/Home";
import Drivers from "./pages/Drivers/Drivers";
import AddDriver from "./pages/AddDriver/AddDriver";
import UpdateDriver from "./pages/UpdateDriver/UpdateDriver";
import AddCar from "./pages/AddCar/AddCar";
import UpdateCar from "./pages/UpdateCar/UpdateCar";
import NotFound from "./pages/NotFound/NotFound";
import Spectators from "./pages/Spectators/Spectators";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <CarsProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={`/cars/add`} component={AddCar} />
            <Route path={`/cars/update/:id`} component={UpdateCar} />
            <Route path="/spectators" component={Spectators} />
            <Route path="*" component={NotFound} />
            </Switch>
        </CarsProvider>
        <DriversProvider>
          <Switch>
            <Route exact path={`/drivers`} component={Drivers} />
            <Route path={`/drivers/add`} component={AddDriver} />
            <Route path={`/drivers/update/:id`} component={UpdateDriver}/>
            </Switch>
        </DriversProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
