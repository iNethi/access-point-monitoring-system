import React from 'react';
import {AppBar, Toolbar, Button, Grid, Typography} from '@mui/material';


const NavBar = () => {
    return (
        <AppBar position="static" sx={{

        }}>
            <Toolbar>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ padding: '0 40px' }} // Add padding here
                >
                    <Grid item>
                        <Typography>ACCESS POINTS</Typography>
                    </Grid>
                    <Grid item>
                        <a href="https://grafana.inethilocal.net/" target="_blank" rel="noopener noreferrer"
                           style={{textDecoration: 'none', color: 'inherit'}}>
                            <Typography>MONITOR</Typography>
                        </a>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    );
};


export default NavBar;