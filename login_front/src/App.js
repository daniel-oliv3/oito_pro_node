import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/routesAdm';
import history from './services/history';

import { AuthProvider } from './Context/AuthContext';


function App() {
  return (
    <div>
      <AuthProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
