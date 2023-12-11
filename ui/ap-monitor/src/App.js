import React, { useState, useEffect } from 'react';
import {Container, ThemeProvider, Fab} from '@mui/material';
import DeviceList from './components/DeviceLists';
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import Theme from "./Theme";
import AddIcon from '@mui/icons-material/Add';
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import Alert from '@mui/material/Alert';
import EditDeviceDialog from './components/EditDeviceDialog';
import AddDeviceDialog from './components/AddDeviceDialog';
function App() {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deviceToDelete, setDeviceToDelete] = useState(null);
    const [devices, setDevices] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '' });
    const [successAlert, setSuccessAlert] = useState({ show: false, message: '' });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deviceToEdit, setDeviceToEdit] = useState({ name: '', ip_address: '', device_type: '' });
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
    // Fetch devices from your API
    fetch('https://ap-backend.inethilocal.net/devices/')
        .then(response => response.json())
        .then(data => setDevices(data))
        .catch(error => console.error('Error:', error));

    }, []);

    const handleAddClick = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleAddDevice = (newDevice) => {
        setOpenAddDialog(false);

        fetch('https://ap-backend.inethilocal.net/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDevice),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setSuccessAlert({ show: true, message: "Device successfully added." });
                fetchDevices(); // Re-fetch devices
            })
            .catch(error => {
                console.error('Error:', error);
                setAlert({ show: true, message: "Failed to add the device." });
            });
    };

    const fetchDevices = () => {
        fetch('https://ap-backend.inethilocal.net/devices/')
            .then(response => response.json())
            .then(data => setDevices(data))
            .catch(error => console.error('Error:', error));
    };

    const handleEditClick = (device) => {
        setDeviceToEdit(device);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleUpdateDevice = (oldIpAddress, updatedDevice) => {
        setOpenEditDialog(false);
        fetch(`https://ap-backend.inethilocal.net/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                old_ip_address: oldIpAddress,
                new_device_data: updatedDevice
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setSuccessAlert({ show: true, message: "Device successfully updated." });
                //  update state
                fetchDevices();

            })
            .catch(error => {
                console.error('Error:', error);
                setAlert({ show: true, message: "Failed to update the device." });
            });
    };

    const handleDeleteClick = (device) => {
        setDeviceToDelete(device);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        setOpenDeleteDialog(false);
        if (deviceToDelete) {
            // Perform API call to delete the device
            fetch(`https://ap-backend.inethilocal.net/delete/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ip_address: deviceToDelete.ip_address }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(() => {
                    // Remove the deleted device from the state
                    setDevices(devices.filter(device => device.ip_address !== deviceToDelete.ip_address));
                    setSuccessAlert({show: true, message: "Device successfully deleted."})
                })
                .catch(error => {
                    console.error('Error:', error);
                    setAlert({ show: true, message: "Failed to remove the device. Please contact support." });
                });
        }
    };
    const handleCloseAlert = () => {
        setAlert({ show: false, message: '' });
    };
    const handleCloseSuccessAlert = () => {
        setSuccessAlert({ show: false, message: '' });
    };

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
              {alert.show && (
                  <Alert severity="error" onClose={handleCloseAlert}>
                      {alert.message}
                  </Alert>
              )}
              {successAlert.show && (
                  <Alert severity="success" onClose={handleCloseSuccessAlert}>
                      {successAlert.message}
                  </Alert>
              )}
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

                  <DeviceList devices={devices} onDelete={handleDeleteClick} onEdit={handleEditClick}/>
                  <ConfirmDeleteDialog
                      open={openDeleteDialog}
                      handleClose={handleCloseDeleteDialog}
                      handleConfirm={handleConfirmDelete}
                  />
                  <EditDeviceDialog
                      open={openEditDialog}
                      handleClose={handleCloseEditDialog}
                      device={deviceToEdit}
                      handleUpdate={handleUpdateDevice}
                  />
              </Box>
              <Fab
                  onClick={handleAddClick}
                  color="button"
                  aria-label="add"
                  sx={{
                      position: 'fixed',
                      bottom: Theme.spacing(4),
                      right: Theme.spacing(4),
                  }}
              >
                  <AddIcon />
              </Fab>
              <AddDeviceDialog
                  open={openAddDialog}
                  handleClose={handleCloseAddDialog}
                  handleAdd={handleAddDevice}
              />
          </Box>

      </ThemeProvider>



  );
}

export default App;
