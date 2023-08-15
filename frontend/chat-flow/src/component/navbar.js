import React from 'react';
import { Box, Flex, Spacer, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import '../style/navbar.css';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  const renderAuthButton = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
      return (
        <NavLink
          to="/"
          activeClassName="active-link"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      );
    } else {
      return (
        <>
          <NavLink to="/login" activeClassName="active-link">
            Login
          </NavLink>
          <NavLink to="/signup" activeClassName="active-link">
            Signup
          </NavLink>
        </>
      );
    }
  };

  const renderUsername = () => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');

    if (token && user) {
      const parsedUser = JSON.parse(user);
      return <span>Welcome, {parsedUser.name}</span>;
    } else {
      return null;
    }
  };

  return (
    <nav>
      <Flex align="center">
        <Box className="nav-logo">chat-flow</Box>
      </Flex>
      <Spacer />
      <IconButton
        className="hamburger-icon"
        size="md"
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        display={{ base: 'block', md: 'none' }}
        onClick={onToggle}
      />
      <Flex className="nav-links" display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}>
        <NavLink to="/" activeClassName="active-link" exact>
          Home
        </NavLink>
        {renderUsername()}
        {renderAuthButton()}
      </Flex>
    </nav>
  );
};

export default Navbar;
