import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import '../../styles/App.css';
import { useSelector } from "react-redux";
import { stateRedux } from "../../Type/ReduxTypes";
import { ROLE_ADMIN } from "../../Constant/Constant";

export function Header () {
  const location = useLocation();

  // Define your navigation links and corresponding labels
  const navLinks = [
    { to: '/home', label: 'Home Page' },
    { to: '/admin', label: 'Admin Page' },
    { to: '/repo-list', label: 'Repo List Page' },
    { to: '/system-infor', label: 'System Information Page' },
  ];

  const user = useSelector((state: stateRedux) =>state.userReducer.user)


  // Find the index of the active tab based on the current route
  const activeTabIndex = navLinks.findIndex(link => link.to === location.pathname);

  // Filter the navLinks array based on the user's role
  const filteredNavLinks = navLinks.filter((link) => {
    const adminRequiredPage = ['/system-infor', '/admin']

    // Only show the "System Information Page" link if the user has the admin role
    return !adminRequiredPage.includes(link.to) || user.role === ROLE_ADMIN;
  });

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6">MY APP</Typography>
      </Toolbar>
        <Tabs value={activeTabIndex} TabIndicatorProps={{ style: { backgroundColor: 'grey' } }}>
          {filteredNavLinks.map((link, index) => (
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
