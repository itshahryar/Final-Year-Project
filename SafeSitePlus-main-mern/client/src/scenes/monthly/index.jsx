import React from 'react';
import { Container, Card, CardContent, Typography, Switch, FormControlLabel, Button, Grid, MenuItem, Select, RadioGroup, Radio, FormControl, FormLabel, FormGroup } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import BackupIcon from '@mui/icons-material/Backup';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import BuildIcon from '@mui/icons-material/Build';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { red } from '@mui/material/colors';

const SystemConfiguration = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>System Configuration</Typography>

      <Grid container spacing={4}>
        {/* Advanced Notification Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><NotificationsIcon sx={{ mr: 1 }} /> Advanced Notification Settings</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Email Notifications"
              />
              <FormControlLabel
                control={<Switch />}
                label="Enable SMS Notifications"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Notification Frequency:
              </Typography>
              <FormControl sx={{ mt: 1 }}>
                <Select defaultValue="">
                  <MenuItem value="immediate">Immediate</MenuItem>
                  <MenuItem value="daily">Daily Summary</MenuItem>
                  <MenuItem value="weekly">Weekly Summary</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* User Role and Permission Management */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><SecurityIcon sx={{ mr: 1 }} /> User Role and Permission Management</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Role-Based Access Control (RBAC)"
              />
              <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                Create Custom Role
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* System Maintenance Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><BuildIcon sx={{ mr: 1 }} /> System Maintenance Settings</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Scheduled Downtime"
              />
              <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
                Perform System Health Check
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Backup and Restore */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><BackupIcon sx={{ mr: 1 }} /> Data Backup and Restore</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Automated Backups"
              />
              <Button variant="outlined" color="secondary"  sx={{ mt: 2  }}>
                Manual Backup
              </Button>
              <Button variant="outlined" color="primary" sx={{ mt: 2, ml: 2 }}>
                Restore Data
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Integration Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><IntegrationInstructionsIcon sx={{ mr: 1 }} /> Integration Settings</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable API Integration"
              />
              <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                Manage Webhooks
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><SecurityIcon sx={{ mr: 1 }} /> Security Settings</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Two-Factor Authentication (2FA)"
              />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Password Policy:
              </Typography>
              <FormGroup sx={{ mt: 1 }}>
                <FormControlLabel control={<Switch />} label="Minimum Length" />
                <FormControlLabel control={<Switch />} label="Complexity Requirements" />
                <FormControlLabel control={<Switch />} label="Password Expiration" />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* UI Customization */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6"><DashboardCustomizeIcon sx={{ mr: 1 }} /> UI Customization</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Dark Mode"
              />
              <FormControl sx={{ mt: 2 }}>
                <Select defaultValue="">
                  <MenuItem value="dark">Dark Mode</MenuItem>
                  <MenuItem value="light">Light Mode</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                Customize Dashboard Layout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SystemConfiguration;
