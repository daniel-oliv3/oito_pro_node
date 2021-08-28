import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { AuthProvider } from './Context/AuthContext';


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
