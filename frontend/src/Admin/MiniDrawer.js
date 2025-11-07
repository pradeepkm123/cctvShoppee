// // import React, { useState } from 'react';
// // import {
// //   Drawer, List, ListItem, ListItemIcon, ListItemText,
// //   IconButton, Typography, Divider, Toolbar, Box, AppBar, CssBaseline
// // } from '@mui/material';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// // import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// // import DashboardIcon from '@mui/icons-material/Dashboard';
// // import CategoryIcon from '@mui/icons-material/Category';
// // import InventoryIcon from '@mui/icons-material/Inventory';
// // import SendIcon from '@mui/icons-material/Send';
// // import DraftsIcon from '@mui/icons-material/Drafts';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import ReportIcon from '@mui/icons-material/Report';
// // import MailIcon from '@mui/icons-material/Mail';
// // import ChatIcon from '@mui/icons-material/Chat';
// // import StoreIcon from '@mui/icons-material/Store';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import PaymentIcon from '@mui/icons-material/Payment';







// // // Import your components
// // import Dashboard from './Dashboard';
// // import Categories from './Categories';
// // import Product from './Product';
// // import OrderLists from './OrderLists';
// // import Chat from './Chat';
// // import Report from './Reports';
// // import Suppliers from './Suppliers';
// // import Shipping from './Shipping';
// // import Notification from './Notification';
// // import Payment from './Payment';
// // import Inventory from './Inventory';


// // // Define components for extra menu items
// // const SendEmail = () => <div>Send Email Content</div>;
// // const Drafts = () => <div>Drafts Content</div>;
// // const AllMail = () => <div>All Mail Content</div>;
// // const Trash = () => <div>Trash Content</div>;
// // const Spam = () => <div>Spam Content</div>;

// // const drawerWidth = 240;

// // const MiniDrawer = () => {
// //   const [open, setOpen] = useState(true);
// //   const [selectedItem, setSelectedItem] = useState('Dashboard');

// //   const toggleDrawer = () => {
// //     setOpen(!open);
// //   };

// //   const handleMenuItemClick = (text) => {
// //     setSelectedItem(text);
// //   };

// //   const renderContent = () => {
// //     switch (selectedItem) {
// //       case 'Categories':
// //         return <Categories />;
// //       case 'Product':
// //         return <Product />;
// //       case 'Send email':
// //         return <SendEmail />;
// //       case 'Drafts':
// //         return <Drafts />;
// //       case 'Notification':
// //         return <Notification />;
// //       case 'Order':
// //         return <OrderLists />;
// //       case 'Shipping':
// //         return <Shipping />;
// //       case 'Chat':
// //         return <Chat />;
// //       case 'Report':
// //         return <Report />;
// //       case 'Payment':
// //         return <Payment />;
// //       case 'Supplier':
// //         return <Suppliers />;
// //       case 'Inventory':
// //         return <Inventory/>;
// //       case 'Dashboard':
// //       default:
// //         return <Dashboard />;
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open drawer"
// //             onClick={toggleDrawer}
// //             edge="start"
// //             sx={{ mr: 2, ...(open && { display: 'none' }) }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Typography variant="h6" noWrap component="div">
// //             Admin Panel
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Sidebar Drawer */}
// //       <Drawer
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           '& .MuiDrawer-paper': {
// //             width: drawerWidth,
// //             boxSizing: 'border-box',
// //           },
// //         }}
// //         variant="persistent"
// //         anchor="left"
// //         open={open}
// //       >
// //         <Toolbar>
// //           <IconButton onClick={toggleDrawer}>
// //             {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
// //           </IconButton>
// //         </Toolbar>
// //         <Divider />

// //         {/* Top Menu Items */}
// //         <List>
// //           <ListItem button onClick={() => handleMenuItemClick('Dashboard')}>
// //             <ListItemIcon><DashboardIcon /></ListItemIcon>
// //             <ListItemText primary="Dashboard" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Categories')}>
// //             <ListItemIcon><CategoryIcon /></ListItemIcon>
// //             <ListItemText primary="Categories" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Product')}>
// //             <ListItemIcon><InventoryIcon /></ListItemIcon>
// //             <ListItemText primary="Product" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Notification')}>
// //             <ListItemIcon><NotificationsIcon /></ListItemIcon>
// //             <ListItemText primary="Notification" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Report')}>
// //             <ListItemIcon><ReportIcon /></ListItemIcon>
// //             <ListItemText primary="Reports" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Payment')}>
// //             <ListItemIcon><PaymentIcon /></ListItemIcon>
// //             <ListItemText primary="Payment" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('inventory')}>
// //             <ListItemIcon><PaymentIcon /></ListItemIcon>
// //             <ListItemText primary="Inventory" />
// //           </ListItem>
// //         </List>

// //         <Divider />

// //         {/* Bottom Menu Items */}
// //         <List>
// //           <ListItem button onClick={() => handleMenuItemClick('Supplier')}>
// //             <ListItemIcon><StoreIcon /></ListItemIcon>
// //             <ListItemText primary="Supplier" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Order')}>
// //             <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
// //             <ListItemText primary="Order" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Shipping')}>
// //             <ListItemIcon><LocalShippingIcon /></ListItemIcon>
// //             <ListItemText primary="Shipping" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleMenuItemClick('Chat')}>
// //             <ListItemIcon><ChatIcon /></ListItemIcon>
// //             <ListItemText primary="Chat" />
// //           </ListItem>
// //         </List>
// //       </Drawer>

// //       {/* Main Content */}
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //         <Toolbar />
// //         {renderContent()}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default MiniDrawer;







// import React, { useState } from 'react';
// import {
//   Drawer, List, ListItem, ListItemIcon, ListItemText,
//   IconButton, Typography, Divider, Toolbar, Box, AppBar, CssBaseline,
//   Collapse, ListItemButton
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import CategoryIcon from '@mui/icons-material/Category';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import SendIcon from '@mui/icons-material/Send';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ReportIcon from '@mui/icons-material/Report';
// import MailIcon from '@mui/icons-material/Mail';
// import ChatIcon from '@mui/icons-material/Chat';
// import StoreIcon from '@mui/icons-material/Store';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import PaymentIcon from '@mui/icons-material/Payment';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import { FaCube } from 'react-icons/fa';
// import BusinessIcon from '@mui/icons-material/Business';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PeopleIcon from '@mui/icons-material/People';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



// // Import your components
// import Dashboard from './Dashboard';
// import Categories from './Categories';
// import Product from './Product';
// import OrderLists from './OrderLists';
// import Chat from './Chat';
// import Report from './Reports';
// import Suppliers from './Suppliers';
// import Shipping from './Shipping';
// import Notification from './Notification';
// import Payment from './Payment';
// import Inventory from './Inventory';
// import Warehouse from './Warehouse';
// import Brand from './Brand';
// import Location from './Location';
// import Master from './Master';
// import Customer from './Customer';
// import StockInward from './StockInword';
// import StockOutward from './StockOutword';
// import SalesPerson from './SalesPerson';
// import AdminReport from './AdminReport';
// import InventoryInvoic from './InventoryInvoic';

// const drawerWidth = 240;

// const MiniDrawer = () => {
//   const [open, setOpen] = useState(true);
//   const [selectedItem, setSelectedItem] = useState('Dashboard');
//   const [inventoryOpen, setInventoryOpen] = useState(false);

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const handleMenuItemClick = (text) => {
//     setSelectedItem(text);
//   };

//   const handleInventoryClick = () => {
//     setInventoryOpen(!inventoryOpen);
//   };

//   const renderContent = () => {
//     switch (selectedItem) {
//       case 'Categories':
//         return <Categories />;
//       case 'Product':
//         return <Product />;
//       case 'Notification':
//         return <Notification />;
//       case 'Order':
//         return <OrderLists />;
//       case 'Shipping':
//         return <Shipping />;
//       case 'Chat':
//         return <Chat />;
//       case 'Report':
//         return <Report />;
//       case 'Payment':
//         return <Payment />;
//       case 'Supplier':
//         return <Suppliers />;
//       case 'Inventory':
//         return <Inventory />;
//       case 'Warehouse':
//         return <Warehouse />;
//       case 'Brand':
//         return <Brand />;
//       case 'Location':
//         return <Location />;
//       case 'Master':
//         return <Master />;
//       case 'Customer':
//         return <Customer />;
//       case 'StockInward':
//         return <StockInward />;
//       case 'StockOutward':
//         return <StockOutward />;
//       case 'SalesPerson':
//         return <SalesPerson />;
//       case 'AdminReport':
//         return <AdminReport />;
//       case 'InventoryInvoic':
//         return <InventoryInvoic/>;
//       case 'Dashboard':
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={toggleDrawer}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Admin Panel
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar Drawer */}
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <Toolbar>
//           <IconButton onClick={toggleDrawer}>
//             {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </Toolbar>
//         <Divider />

//         {/* Top Menu Items */}
//         <List>
//           <ListItem button onClick={() => handleMenuItemClick('Dashboard')}>
//             <ListItemIcon><DashboardIcon /></ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Categories')}>
//             <ListItemIcon><CategoryIcon /></ListItemIcon>
//             <ListItemText primary="Categories" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Product')}>
//             <ListItemIcon><InventoryIcon /></ListItemIcon>
//             <ListItemText primary="Product" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Notification')}>
//             <ListItemIcon><NotificationsIcon /></ListItemIcon>
//             <ListItemText primary="Notification" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Report')}>
//             <ListItemIcon><ReportIcon /></ListItemIcon>
//             <ListItemText primary="Reports" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Payment')}>
//             <ListItemIcon><PaymentIcon /></ListItemIcon>
//             <ListItemText primary="Payment" />
//           </ListItem>

//           {/* Inventory Tree Structure */}
//           <ListItemButton onClick={handleInventoryClick}>
//             <ListItemIcon><FaCube /></ListItemIcon>
//             <ListItemText primary="Inventory" />
//             {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//           <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Warehouse')}>
//                 <ListItemIcon><StoreIcon /></ListItemIcon>
//                 <ListItemText primary="Warehouse" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Brand')}>
//                 <ListItemIcon><BusinessIcon /></ListItemIcon>
//                 <ListItemText primary="Brand" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Location')}>
//                 <ListItemIcon><LocationOnIcon /></ListItemIcon>
//                 <ListItemText primary="Location" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Master')}>
//                 <ListItemIcon><SettingsIcon /></ListItemIcon>
//                 <ListItemText primary="Master" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Customer')}>
//                 <ListItemIcon><PeopleIcon /></ListItemIcon>
//                 <ListItemText primary="Customer" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('StockInward')}>
//                 <ListItemIcon><Inventory2Icon /></ListItemIcon>
//                 <ListItemText primary="StockInward" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('StockOutward')}>
//                 <ListItemIcon><Inventory2Icon /></ListItemIcon>
//                 <ListItemText primary="StockOutward" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('SalesPerson')}>
//                 <ListItemIcon><SupportAgentIcon /></ListItemIcon>
//                 <ListItemText primary="SalesPerson" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('AdminReport')}>
//                 <ListItemIcon><BarChartIcon /></ListItemIcon>
//                 <ListItemText primary="Report" />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('InventoryInvoic')}>
//                 <ListItemIcon><ReceiptLongIcon/></ListItemIcon>
//                 <ListItemText primary="Inventory Invoice" />
//               </ListItemButton>
//             </List>
//           </Collapse>
//         </List>

//         <Divider />

//         {/* Bottom Menu Items */}
//         <List>
//           <ListItem button onClick={() => handleMenuItemClick('Supplier')}>
//             <ListItemIcon><StoreIcon /></ListItemIcon>
//             <ListItemText primary="Supplier" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Order')}>
//             <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
//             <ListItemText primary="Order" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Shipping')}>
//             <ListItemIcon><LocalShippingIcon /></ListItemIcon>
//             <ListItemText primary="Shipping" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuItemClick('Chat')}>
//             <ListItemIcon><ChatIcon /></ListItemIcon>
//             <ListItemText primary="Chat" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         {renderContent()}
//       </Box>
//     </Box>
//   );
// };

// export default MiniDrawer;





import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  IconButton, Typography, Divider, Toolbar, Box, AppBar, CssBaseline,
  Collapse, ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReportIcon from '@mui/icons-material/Report';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChatIcon from '@mui/icons-material/Chat';
import { FaCube } from 'react-icons/fa';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


// Import your components
import Dashboard from './Dashboard';
import Categories from './Categories';
import Product from './Product';
import OrderLists from './OrderLists';
import Chat from './Chat';
import Report from './Reports';
import Suppliers from './Suppliers';
import Shipping from './Shipping';
import Notification from './Notification';
import Payment from './Payment';
import Inventory from './Inventory';
import Warehouse from './Warehouse';
import Brand from './Brand';
import Location from './Location';
import Master from './Master';
import Customer from './Customer';
import StockInward from './StockInword';
import StockOutward from './StockOutword';
import SalesPerson from './SalesPerson';
import AdminReport from './AdminReport';
import InventoryInvoic from './InventoryInvoic';
import StoreCustomizations from './StoreCustomization';

const drawerWidth = 240;

const MiniDrawer = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (text) => {
    setSelectedItem(text);
  };

  const handleInventoryClick = () => {
    setInventoryOpen(!inventoryOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Categories':
        return <Categories />;
      case 'Product':
        return <Product />;
      case 'Notification':
        return <Notification />;
      case 'Order':
        return <OrderLists />;
      case 'Shipping':
        return <Shipping />;
      case 'Chat':
        return <Chat />;
      case 'Report':
        return <Report />;
      case 'Payment':
        return <Payment />;
      case 'Supplier':
        return <Suppliers />;
      case 'Inventory':
        return <Inventory />;
      case 'Warehouse':
        return <Warehouse />;
      case 'Brand':
        return <Brand />;
      case 'Location':
        return <Location />;
      case 'Master':
        return <Master />;
      case 'Customer':
        return <Customer />;
      case 'StockInward':
        return <StockInward />;
      case 'StockOutward':
        return <StockOutward />;
      case 'SalesPerson':
        return <SalesPerson />;
      case 'AdminReport':
        return <AdminReport />;
      case 'InventoryInvoic':
        return <InventoryInvoic />;
      case 'StoreCustomizations':
        return <StoreCustomizations />;
      case 'Dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative', // Ensure the Drawer is positioned relatively
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />

        {/* Top Menu Items */}
        <List>
          <ListItem button onClick={() => handleMenuItemClick('Dashboard')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Categories')}>
            <ListItemIcon><CategoryIcon /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Product')}>
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Notification')}>
            <ListItemIcon><NotificationsIcon /></ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Report')}>
            <ListItemIcon><ReportIcon /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Payment')}>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary="Payment" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('StoreCustomizations')}>
            <ListItemIcon><StoreIcon/></ListItemIcon>
            <ListItemText primary="Store Customization" />
          </ListItem>

          {/* Inventory Tree Structure */}
          <ListItemButton onClick={handleInventoryClick}>
            <ListItemIcon><FaCube /></ListItemIcon>
            <ListItemText primary="Inventory" />
            {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Warehouse')}>
                <ListItemIcon><StoreIcon /></ListItemIcon>
                <ListItemText primary="Warehouse" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Brand')}>
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary="Brand" />
              </ListItemButton>
              {/* <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Location')}>
                <ListItemIcon><LocationOnIcon /></ListItemIcon>
                <ListItemText primary="Location" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Master')}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Master" />
              </ListItemButton> */}
              {/* <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Customer')}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItemButton> */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('StockInward')}>
                <ListItemIcon><Inventory2Icon /></ListItemIcon>
                <ListItemText primary="StockInward" />
              </ListItemButton>
              {/* <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('StockOutward')}>
                <ListItemIcon><Inventory2Icon /></ListItemIcon>
                <ListItemText primary="StockOutward" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('SalesPerson')}>
                <ListItemIcon><SupportAgentIcon /></ListItemIcon>
                <ListItemText primary="SalesPerson" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('AdminReport')}>
                <ListItemIcon><BarChartIcon /></ListItemIcon>
                <ListItemText primary="Report" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('InventoryInvoic')}>
                <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
                <ListItemText primary="Inventory Invoice" />
              </ListItemButton> */}
            </List>
          </Collapse>
        </List>

        <Divider />

        {/* Bottom Menu Items */}
        <List>
          {/* <ListItem button onClick={() => handleMenuItemClick('Supplier')}>
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <ListItemText primary="Supplier" />
          </ListItem> */}
          <ListItem button onClick={() => handleMenuItemClick('Order')}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Order" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Shipping')}>
            <ListItemIcon><LocalShippingIcon /></ListItemIcon>
            <ListItemText primary="Shipping" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('Chat')}>
            <ListItemIcon><ChatIcon /></ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        </List>

        {/* Fixed Logout Button at the Bottom */}
        <List
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'background.paper',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            p: 0,
          }}
        >
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
