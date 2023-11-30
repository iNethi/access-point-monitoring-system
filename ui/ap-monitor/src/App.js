import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import DeviceList from './components/DeviceLists';

function App() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch devices from your API
    fetch('http://localhost:8000/devices/')
        .then(response => response.json())
        .then(data => setDevices(data));
  }, []);

  return (
      <Container>
        <DeviceList devices={devices} />
      </Container>
  );
}

export default App;
