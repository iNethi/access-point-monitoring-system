import React, { useState, useEffect } from 'react';
import {Container, ThemeProvider, Fab} from '@mui/material';
import DeviceList from './components/DeviceLists';
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import Theme from "./Theme";
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    // Fetch devices from your API
    fetch('http://localhost:8000/devices/')
        .then(response => response.json())
        .then(data => setDevices(data));
  }, []);

  return (
      <ThemeProvider theme={Theme}>
          <Box
              sx={{
                  minHeight: '100vh',
                  backgroundColor: Theme.palette.background.default,
                  display: 'flex',
                  flexDirection: 'column',
              }}
          >
              <NavBar />
              <Box
                  sx={{
                      flexGrow: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'start',
                      padding: Theme.spacing(2), // Add some padding around the list
                      margin: Theme.spacing(2),


                  }}
              >
                  <DeviceList devices={devices} />
              </Box>
              <Fab
                  color="primary"
                  aria-label="add"
                  sx={{
                      position: 'fixed',
                      bottom: Theme.spacing(4),
                      right: Theme.spacing(4),
                  }}
                  onClick={() => {
                      // Handle click event for the Add button
                  }}
              >
                  <AddIcon />
              </Fab>
          </Box>
      </ThemeProvider>



  );
}

export default App;
