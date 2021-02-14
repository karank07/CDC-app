import React from 'react';

import { Login, PatientReg, NurseReg, DoctorReg } from './components';

class App extends React.Component {
    render() {
        return (
            <div style={{
                height: '100vh',
                minHeight: '100vh',
                marginTop: 0
            }
            }>
                <Login />
                <PatientReg />
                <NurseReg />
                <DoctorReg /> 
            </div >
        );
    }
}

export default App;