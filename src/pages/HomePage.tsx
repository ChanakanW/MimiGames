import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ApprovalResult from './leave/leaveresults/ApprovalResult';
import PendingApproval from './leave/leaveresults/PendingApproval';
import CardRemainingLeaveDays from './leave/cards/CardRemainingLeaveDays';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function HomePage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card
      sx={{
        p: 2,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        borderRadius: '16px',                      // Rounded corners
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Divider
          textAlign="left"
          sx={{
            borderColor: '#03a9f4',
            borderWidth: '2px',
            margin: '16px 0',
            borderRadius: '12px',
          }}
        >

        </Divider>
        <CardRemainingLeaveDays />

        <AppBar position="static" sx={{ borderRadius: '16px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              borderRadius: '12px',
              bgcolor: theme.palette.primary.light,
            }}
          >
            <Tab label="รออนุมัติ" {...a11yProps(0)} sx={{ fontWeight: 'bold' }} />
            <Tab label="ผลการอนุมัติ" {...a11yProps(1)} sx={{ fontWeight: 'bold' }} />
          </Tabs>
        </AppBar>
        
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ApprovalResult />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PendingApproval />
        </TabPanel>
      </Box>
    </Card>
  );
}
