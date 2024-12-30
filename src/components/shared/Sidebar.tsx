import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaProductHunt } from 'react-icons/fa6';
import {
  FaEdit,
  FaHeart,
  FaListAlt,
  FaPlusCircle,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaUserCircle,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/auth-slice/AuthSlice';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: any = useAppSelector(currentUser);

  const [open, setOpen] = useState(false);
  const [parentItem, setParentItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleSubMenu = (text: string) => {
    setParentItem(text);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const userMenuItems = [
    {
      text: 'Dashboard Home',
      icon: <DashboardIcon className="" />,
      path: '/dashboard/user-dashboard', // Overview of recent orders and account activity
    },
    {
      text: 'My Profile',
      icon: <FaUserCircle className="" />,
      path: '/dashboard/my-profile',
    },
    {
      text: 'My Orders',
      icon: <FaShoppingCart className="" />,
      path: '/dashboard/my-orders', // List of all past orders with details
    },
    {
      text: 'My Wishlist',
      icon: <FaHeart className="" />,
      path: '/dashboard/my-wishlist', // Saved products for future purchases
    },
    {
      text: 'Followed Shops',
      icon: <FaStore className="" />,
      path: '/dashboard/followed-shops', // List of shops the user is following
    },
    {
      text: 'My Reviews',
      icon: <FaStar className="" />,
      path: '/dashboard/my-reviews', // Reviews left by the user
    },
    // {
    //   text: 'Notifications',
    //   icon: <FaBell className="" />,
    //   path: '/user/notifications', // Notifications related to orders, discounts, etc.
    // },
  ];

  const adminMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon className="" />,
      path: '/dashboard/admin-dashboard',
    },
    {
      text: 'My Profile',
      icon: <FaUserCircle className="" />,
      path: '/dashboard/my-profile',
    },
    {
      text: 'User Management',
      icon: <PeopleIcon className="" />,
      children: [
        {
          text: 'All Users',
          icon: <PeopleIcon className="" />,
          path: '/dashboard/admin/all-users',
        },
      ],
    },
    {
      text: 'Shop Management',
      icon: <HomeIcon className="" />,
      children: [
        {
          text: 'All Shops',
          icon: <HomeIcon className="" />,
          path: '/dashboard/admin/all-shops',
        },
      ],
    },
    {
      text: 'Categories Management',
      icon: <PeopleIcon className="" />,
      children: [
        {
          text: 'All Categories',
          icon: <PeopleIcon className="" />,
          path: '/dashboard/admin/all-categories',
        },
        {
          text: 'Add Category',
          icon: <PeopleIcon className="" />,
          path: '/dashboard/admin/add-category',
        },
      ],
    },
    {
      text: 'Product Management',
      icon: <FaProductHunt className="" />,
      children: [
        {
          text: 'All Products',
          icon: <FaProductHunt className="" />,
          path: '/dashboard/admin/all-products',
        },
      ],
    },
    {
      text: 'Order Management',
      icon: <PeopleIcon className="" />,
      children: [
        {
          text: 'All Orders',
          icon: <PeopleIcon className="" />,
          path: '/dashboard/admin/all-orders',
        },
      ],
    },
    {
      text: 'Coupon Management',
      icon: <PeopleIcon className="" />,
      children: [
        {
          text: 'All Coupon',
          icon: <PeopleIcon className="" />,
          path: '/dashboard/admin/all-coupons',
        },
        {
          text: 'Add Coupon',
          icon: <PeopleIcon className="" />,
          path: '/dashboard/admin/add-coupon',
        },
      ],
    },
    {
      text: 'Review Monitoring',
      icon: <PeopleIcon className="" />,
      path: '/dashboard/admin/all-reviews',
    },
  ];

  const vendorMenuItems = [
    {
      text: 'Vendor Dashboard',
      icon: <DashboardIcon className="" />,
      path: '/dashboard/vendor-dashboard', // Overview of orders, reviews, and inventory statistics
    },
    {
      text: 'My Profile',
      icon: <FaUserCircle className="" />,
      path: '/dashboard/my-profile',
    },
    {
      text: 'Shop Management',
      icon: <FaStore className="" />,
      children: [
        {
          text: 'All Shop',
          icon: <FaEdit className="" />,
          path: '/dashboard/vendor/all-shop', // Manage shop info: name, logo, description
        },
        {
          text: 'Add Shop',
          icon: <FaEdit className="" />,
          path: '/dashboard/vendor/add-shop', // Manage shop info: name, logo, description
        },
      ],
    },
    {
      text: 'Product Management',
      icon: <FaProductHunt className="" />,
      children: [
        {
          text: 'All Products',
          icon: <FaListAlt className="" />,
          path: '/dashboard/vendor/all-products', // Paginated list of products
        },
        {
          text: 'Add Product',
          icon: <FaPlusCircle className="" />,
          path: '/dashboard/vendor/add-product', // Add new products
        },
      ],
    },
    {
      text: 'Order History',
      icon: <FaShoppingCart className="" />,
      path: '/dashboard/vendor/order-history', // Detailed view of customer orders
    },
    {
      text: 'Review Management',
      icon: <FaStar className="" />,
      path: '/dashboard/vendor/review-management', // Manage and respond to reviews
    },
  ];

  type UserRole = 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN' | 'VENDOR';
  type MenuItem = {
    text: string;
    icon: React.ReactNode;
    path?: string;
    children?: MenuItem[];
  };

  const getMenuItems = (role: UserRole): MenuItem[] => {
    switch (role) {
      case 'CUSTOMER':
        return userMenuItems;
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return adminMenuItems;
      case 'VENDOR':
        return vendorMenuItems;
      default:
        return [];
    }
  };

  return (
    <div>
      {/* Mobile View Menu Button */}
      <div className="block lg:hidden bg-secondary-100 w-full">
        <IconButton className="absolute left-4 z-50" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* small and medium Drawer/Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        variant="temporary"
        className="lg:hidden "
        classes={{
          paper: 'w-64 bg-gray-900 text-white',
        }}
      >
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold">Bazaar Bridge</h1>
            <IconButton onClick={toggleSidebar}>
              <AiOutlineClose />
            </IconButton>
          </div>
          <div className="text-center mx-auto">
            <h3>{user?.role}</h3>
          </div>
        </div>
        <List className="mt-4">
          {getMenuItems(user?.role)?.map((item: any, index: any) => (
            <div key={index}>
              {!item?.children ? (
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => toggleSubMenu(item.text)}
                      className={`${
                        isActive
                          ? ' bg-primary-200 text-primary-500'
                          : 'hover:bg-primary-500 hover:text-black'
                      }`}
                    >
                      <ListItemIcon>
                        {React.cloneElement(item.icon, {
                          className: isActive
                            ? 'text-primary-500'
                            : 'text-gray-500',
                        })}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  )}
                </NavLink>
              ) : (
                <div>
                  <div
                    onClick={() => toggleSubMenu(item.text)}
                    className="menu-item cursor-pointer"
                  >
                    <ListItem key={index} className="hover:bg-gray-700">
                      <ListItemIcon className="">{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </div>
                  <Collapse
                    in={item.text === parentItem}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="pl-4">
                      {item.children.map((subItem: any, index: number) => (
                        <NavLink to={subItem.path} key={index}>
                          {({ isActive }) => (
                            <ListItem
                              key={index}
                              className={`${
                                isActive
                                  ? ' bg-primary-200 text-primary-500'
                                  : 'hover:bg-gray-700 hover:text-black'
                              }`}
                            >
                              <ListItemIcon>
                                {React.cloneElement(subItem.icon, {
                                  className: isActive
                                    ? 'text-primary-500'
                                    : 'text-gray-500',
                                })}
                              </ListItemIcon>
                              <ListItemText primary={subItem.text} />
                            </ListItem>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </Collapse>
                </div>
              )}
            </div>
          ))}
          <Divider />
          <NavLink to={'/'}>
            {({ isActive }) => (
              <ListItem
                className={`${
                  isActive
                    ? ' bg-primary-200 text-primary-500'
                    : 'hover:bg-gray-700 hover:text-black'
                }`}
              >
                <ListItemIcon>
                  <HomeIcon
                    className={`${
                      isActive ? 'text-primary-500' : 'text-gray-500'
                    }`}
                  />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>
            )}
          </NavLink>

          <ListItem onClick={handleLogout} className="cursor-pointer">
            <ListItemIcon>
              <LogoutIcon className="" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex bg-secondary-100 flex-col w-64 h-screen fixed">
        <div className="px-4 text-center">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <div className="text-center mx-auto">
            <h3 className="text-lg">{user?.role}</h3>
          </div>
        </div>
        <List className="mt-4">
          {getMenuItems(user?.role)?.map((item: any, index) => (
            <div key={item.text}>
              {!item.children ? (
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => toggleSubMenu(item.text)}
                      className={`${
                        isActive
                          ? ' bg-primary-200 text-primary-500'
                          : 'hover:bg-primary-500 hover:text-black'
                      }`}
                    >
                      <ListItemIcon>
                        {React.cloneElement(item.icon, {
                          className: isActive
                            ? 'text-primary-500'
                            : 'text-gray-500',
                        })}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  )}
                </NavLink>
              ) : (
                <div>
                  <div
                    onClick={() => toggleSubMenu(item.text)}
                    className="menu-item cursor-pointer"
                  >
                    <ListItem key={index} className="hover:bg-primary-500">
                      <ListItemIcon className="">{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </div>
                  <Collapse
                    in={parentItem === item.text}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="pl-4">
                      {item.children.map((subItem: any, index: number) => (
                        <NavLink to={subItem.path} key={index}>
                          {({ isActive }) => (
                            <ListItem
                              key={index}
                              className={`${
                                isActive
                                  ? ' bg-primary-200 text-primary-500'
                                  : 'hover:bg-primary-500 hover:text-black'
                              }`}
                            >
                              <ListItemIcon>
                                {React.cloneElement(subItem.icon, {
                                  className: isActive
                                    ? 'text-primary-500'
                                    : 'text-gray-500',
                                })}
                              </ListItemIcon>
                              <ListItemText primary={subItem.text} />
                            </ListItem>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </Collapse>
                </div>
              )}
            </div>
          ))}
          <Divider />
          <NavLink to={'/'}>
            {({ isActive }) => (
              <ListItem
                className={`${
                  isActive
                    ? ' bg-primary-200 text-primary-500'
                    : 'hover:bg-primary-500 hover:text-black'
                }`}
              >
                <ListItemIcon>
                  <HomeIcon
                    className={`${
                      isActive ? 'text-primary-500' : 'text-gray-500'
                    }`}
                  />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>
            )}
          </NavLink>

          <ListItem onClick={handleLogout} className="cursor-pointer">
            <ListItemIcon>
              <LogoutIcon className="" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
