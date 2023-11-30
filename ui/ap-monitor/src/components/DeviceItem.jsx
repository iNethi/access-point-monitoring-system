import React from 'react';
import { ListItem, ListItemText, ListItemIcon, Icon } from '@mui/material';
import apIcon from '../images/ap.png';
import switchIcon from '../images/switch.png';
function DeviceItem({ device }) {
    const deviceIcon = device.device_type === 'access_point' ? apIcon : switchIcon;

    return (
        <ListItem>
            <ListItemIcon>
                <img src={deviceIcon} alt={device.device_type} style={{ width: '24px', height: '24px' }} />
            </ListItemIcon>
            <ListItemText primary={device.name} secondary={device.ip_address} />
            {/* Add buttons or actions for editing and deleting */}
        </ListItem>
    );
}

export default DeviceItem;
