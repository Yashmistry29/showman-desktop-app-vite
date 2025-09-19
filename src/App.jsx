import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  // Router,
  Route,
  Routes
} from 'react-router-dom'
import './style/custom.css'
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Measurement from './pages/Measurement';
import Employee from './pages/Employee';
import Customer from './pages/Customer';
import Price from './pages/Price';
import Print from './pages/Print';
import BackupRestore from './pages/BackupRestore';
import { MeasurementProvider } from './components/context/MeasurementContext';

function App() {

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/measurement" element={
            <MeasurementProvider>
              <Measurement />
            </MeasurementProvider>
          } />
          <Route path="/customer" element={<Customer />} />
          <Route path="/price" element={<Price />} />
          <Route path="/print" element={<Print />} />
          <Route path="/backupandrestore" element={<BackupRestore />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
