import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login, PatientReg, NurseReg, DoctorReg } from './components';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div style={{
                    height: '100vh',
                    minHeight: '100vh',
                    marginTop: 0
                }
                }>
                    <Route path="/" component={Login} exact />
                    <Route path="/patient-register" component={PatientReg} exact />
                    <Route path="/nurse-register" component={NurseReg} exact />
                    <Route path="/doctor-register" component={DoctorReg} exact />
                </div >
            </Router>
        );
    }
}

export default App;