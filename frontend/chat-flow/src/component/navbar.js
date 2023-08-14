import React from 'react';
import { Box, Flex, Spacer, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import '../style/navbar.css';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

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
        <NavLink to="/login" activeClassName="active-link">
          Login
        </NavLink>
        <NavLink to="/signup" activeClassName="active-link">
          Signup
        </NavLink>
      </Flex>
    </nav>
  );
};

export default Navbar;
