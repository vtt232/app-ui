import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import '../../styles/App.css';

export function Header () {
  const location = useLocation();

  // Define your navigation links and corresponding labels
  const navLinks = [
    { to: '/home', label: 'Home Page' },
    { to: '/admin', label: 'Admin Page' },
    { to: '/repo-list', label: 'Repo List Page' },
  ];

  // Find the index of the active tab based on the current route
  const activeTabIndex = navLinks.findIndex(link => link.to === location.pathname);

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6">MY APP</Typography>
      </Toolbar>
        <Tabs value={activeTabIndex} TabIndicatorProps={{ style: { backgroundColor: 'grey' } }}>
          {navLinks.map((link, index) => (
            <Tab
              key={index}
              label={link.label}
              component={NavLink}
              to={link.to}
              style={{ color: index === activeTabIndex ? 'blue' : 'gray' }}
            />
          ))}
        </Tabs>
    </AppBar>
  );
}
