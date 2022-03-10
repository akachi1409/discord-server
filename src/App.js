import './App.css';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from "./page/login/login";
import Account from "./page/account/account";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/account' element={<Account/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
