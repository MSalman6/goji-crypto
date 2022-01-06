import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import DaoLight from './DaoLight';
import DaoDark from './DaoDark';
import FarmingLight from './FarmingLight';
import FarmingDark from './FarmingDark';
import LockingLight from './LockingLight';
import LockingDark from './LockingDark';
import NewLockLight from './NewLockLight';
import NewLockDark from './NewLockDark';
import StakingLight from './StakingLight';
import StakingDark from './StakingDark';
import Navbar from './NavBar';
import { NotFound } from 'http-errors';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/staking-light" />
        </Route>
        <Route exact path="/dao-light">
          <DaoLight />
        </Route>
        <Route exact path="/dao-dark">
          <DaoDark />
        </Route>
        <Route exact path="/farming-light">
          <FarmingLight />
        </Route>
        <Route exact path="/farming-dark">
          <FarmingDark />
        </Route>
        <Route exact path="/locking-light">
          <LockingLight />
        </Route>
        <Route exact path="/locking-dark">
          <LockingDark />
        </Route>
        <Route exact path="/new-lock-light">
          <NewLockLight />
        </Route>
        <Route exact path="/new-lock-dark">
          <NewLockDark />
        </Route>
        <Route exact path="/staking-light">
          <StakingLight />
        </Route>
        <Route exact path="/staking-dark">
          <StakingDark />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
