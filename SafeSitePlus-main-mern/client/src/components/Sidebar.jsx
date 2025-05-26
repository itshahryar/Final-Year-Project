import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";



import { useDispatch , useSelector } from "react-redux";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  GroupAddOutlined,
  NotificationImportant,
  DetailsOutlined,
  Details,
  CameraAlt,
  CameraEnhance,
  EditAttributes,
  MenuBook,
  AppRegistration,
  SystemSecurityUpdate,
  CameraAltRounded,
  AllOutOutlined,
  ViewAgendaOutlined,
  EditLocation,
  NoteAddOutlined,
  AutoGraphOutlined,
  ChatBubbleOutline,
  AccessAlarm,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import profileImage from "@assets/profile.jpg";

import { signOut , remType} from "@state";

const navItems = [
  {
    text: "AdminDashboard",
    icon: <HomeOutlined />,
  },

  {
    text: "User Management",
    icon: null,
  },
  
  {
    text: "AddSupervisor",
    icon: <GroupAddOutlined />,
  },
  {
    text: "AuditLogging",
    icon: <Details/>,
  },
  {
    text: "Camera Details",
    icon: <CameraEnhance />,
  },

  {
    text: "ViewSites",
    icon: <CameraAltRounded/>,
  },

  {
    text: "view Notifications",
    icon: <NotificationImportant />,
  },
  
  // {
  //   text: "WeatherDetails",
  //   icon: <ReceiptLongOutlined />,
  // },
   {
    text: "GetAllsites",
    icon: <AllOutOutlined/>,
  },
  // {
  //   text: "Customize Interface",
  //   icon: <EditAttributes/>,
  // },
  {
    text: "SystemConfiguration",
    icon: <MenuBook/>,
  },



  {
    text: "Statistics",
    icon: <ViewAgendaOutlined/>,
  },
 
  // {
  //   text: "Overview",
  //   icon: <PointOfSaleOutlined />,
  // },
  {
    text: "UpdateSupervisor",
    icon: <AppRegistration />,
  },
  // {
  //   text: "Daily",
  //   icon: <TodayOutlined />,
  // },

  {
    text: "RegisterSite",
    icon: <AppRegistration />,
  },

  {
    text: "",
    icon: null,
  },
  // {
    
  //   text: "Admin",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlined />,
  // },
];


const navItems2 = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },

  {
    text: "ViewSites",
    icon: null,
  },
  {
    text: "viewAlerts",
    icon: <NotificationImportant />,
  },
  {
    text: "AnomalyParameters",
    icon: <GroupAddOutlined />,
  },
  {
    text: "Forecasting",
    icon: <AccessAlarm  />,
  },
  {
    text: "Reports",
    icon: <Details/>,
  },
  {
    text: "SiteView",
    icon: <CameraEnhance />,
  },
  {
    text: "Mytasks",
    icon: <NoteAddOutlined/>,
  },
  {
    text: "Stats",
    icon: <AutoGraphOutlined/>,
  },

  {
    text: "Chatbot",
    icon: <ChatBubbleOutline/>,
  },

  {
    text: "Activate",
    icon: <EditLocation/>,
  },

  {
    text: "Predictions",
    icon: <CameraAltRounded/>,
  },
  
  {
    text: "WeatherDetails",
    icon: <ReceiptLongOutlined />,
  },

  {
    text: "ReportPage",
    icon: <ReceiptLongOutlined />,
  },

  {
    text: "Graphical",
    icon: <ReceiptLongOutlined />,
  },

  {
    text: "ReportPage2",
    icon: <ReceiptLongOutlined />,
  },


  // {
  //   text: "Customize Interface",
  //   icon: <EditAttributes/>,
  // },
  // {
  //   text: "System Configuration",
  //   icon: <MenuBook/>,
  // },
]

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  // const {type} = useParams();
  const type = useSelector((state) => state.global.type);
  console.log("type of user is " + type);




  const token = localStorage.getItem('authToken');

  console.log("token is " + token);


 
  // if(type == null){
  //   type = 'supervisor'
  // }
  // const type = 'admin';
  // const [dashboardtype,setdashboard] = useState("Admin");
  const [navitems,setnavitems] = useState([])


  useEffect(() => {
    setActive(pathname.substring(3));

    if(type == null || !token){
      navigate('/login/supervisor')
    }


  
    console.log("type of dashboard is" + type);

  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 1rem 2rem 3rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Safe Site Plus
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              
              {(type.trim()==='admin'?navItems:navItems2).map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem  3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase(); 
                console.log(lcText)//jo text click ho ga

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/dashboard/${type}/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {/* <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>

                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occuploadsation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
