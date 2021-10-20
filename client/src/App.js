import './App.css';
import Homepage from './components/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Userpage from "./components/Userpage/Userpage";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UsersState from './context/UsersState';
import AdminPage from './components/AdminPage/AdminPage';
import EditUserForm from './components/EditForm/EditForm';

function App() {

  return (
    <div className="App">
      <UsersState>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/Userpage" component={Userpage} />
            <Route exact path="/AdminPage" component={AdminPage} />
            <Route exact path="/editForm/:id" component={EditUserForm} />
          </Switch>
        </Router>
      </UsersState>
    </div>
  );
}

export default App;
