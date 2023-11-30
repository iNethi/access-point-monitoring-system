import React from 'react';
import DeviceItem from './DeviceItem';
import { List } from '@mui/material';

function DeviceList({ devices }) {
    // You can sort and separate devices here based on type and IP

    return (
        <List>
            {devices.map(device => (
                <DeviceItem key={device.ip_address} device={device} />
            ))}
        </List>
    );
}

export default DeviceList;
