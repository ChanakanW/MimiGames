import React from 'react';
import { extendTheme,   } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import NotificationOfLeave from '../../pages/leave/NotificationOfLeave';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import HomePage from '../../pages/HomePage';
import LeaveHistory from '../../pages/leave/LeaveHistory';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// ปรับแต่งธีมโดยเพิ่ม Typography
const demoTheme = extendTheme({
  //colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'Kanit, sans-serif', // ตั้งค่าฟอนต์เริ่มต้น
    h1: { fontFamily: 'Kanit, sans-serif' },
    h2: { fontFamily: 'Kanit, sans-serif' },
    h3: { fontFamily: 'Kanit, sans-serif' },
    h4: { fontFamily: 'Kanit, sans-serif' },
    h5: { fontFamily: 'Kanit, sans-serif' },
    h6: { fontFamily: 'Kanit, sans-serif' },
    body1: { fontFamily: 'Kanit, sans-serif' },
    body2: { fontFamily: 'Kanit, sans-serif' },
    button: { fontFamily: 'Kanit, sans-serif' },
    caption: { fontFamily: 'Kanit, sans-serif' },
    overline: { fontFamily: 'Kanit, sans-serif' },
  },
});


// เนื้อหาของหน้าแต่ละหน้า
const pages: Record<string, React.ReactNode> = {
  profile: <div>หน้าโปรไฟล์</div>,
  homepage: <div><HomePage /></div>,
  leavehistory: <div><LeaveHistory /></div>,
  manageleave: <div>จัดการวันลา</div>,
  notificationofleave:<div><NotificationOfLeave /></div>,
  leavesummary: <div>สรุปวันลา</div>,
  integrations: <div>Integrations</div>,
};

const NAVIGATION: Navigation = [
  {
    segment: 'profile',
    title: 'โปรไฟล์',
    icon: (
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{
          width: 28,           // กำหนดความกว้าง
          height: 28,          // กำหนดความสูง
          border: '2px solid #ccc', // เพิ่มกรอบ (ขอบสีเทาอ่อน)
          padding: '10px',      // เพิ่ม Padding ระหว่างกรอบกับเนื้อหา
          backgroundColor: '#fff', // ตั้งค่าพื้นหลังให้ดูชัดเจน
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', // เพิ่มเงา
          borderRadius: '50%', // ทำให้เป็นวงกลม (ถ้าจำเป็น)
        }}
      />
    ),
  },
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'homepage',
    title: 'หน้าแรก',
    icon: <HomeOutlinedIcon />,
  },
  {
    segment: 'leavehistory',
    title: 'ประวัติรายการลา',
    icon: <ManageSearchOutlinedIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'manageleave',
    title: 'จัดการวันลา',
    icon: <DescriptionIcon />,
    children: [
      {
        segment: 'notificationofleave',
        title: 'แจ้งวันลา',
        icon: <NoteAddOutlinedIcon />,
      },
      {
        segment: 'leavesummary',
        title: 'สรุปวันลา',
        icon: <BarChartIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    kind: 'divider',
  },
  // // เพิ่มปุ่มที่ล่างสุด
  // {
  //   title: 'ออกจากระบบ',
  //   icon: <LogoutOutlinedIcon />, // ใช้ไอคอน Logout
  //   //action: {handleLogout}, // ฟังก์ชันที่ทำงานเมื่อคลิก
  // },
];

function handleLogout() {
  localStorage.removeItem("token"); // ลบ token
  window.location.href = '/login';  // หรือใช้ router.navigate('/login') ถ้าคุณใช้ react-router
}

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  }), [pathname]);

  return router;
}




export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter('/homepage'); // เส้นทางเริ่มต้นคือหน้า "หน้าแรก"
  const demoWindow = window ? window() : undefined;
  // ลิงค์แต่ละหน้าจะเปลี่ยน `pathname` และแสดงคอนเทนต์ใน `pages`
  return (
    <AppProvider
    navigation={NAVIGATION}
    branding={{
      logo: (
        <img
          src={'TechForge.png'}
          alt="TechForge logo"
          style={{
            width: '150px',
            height: 'auto',
            margin: ' auto',
            display: 'block',
          }}
        />
      ),
      title: '',
      homeUrl: '/homepage',
    }}
    router={router}
    theme={demoTheme} // ใช้ธีมที่กำหนด
    window={demoWindow}
  >
    <DashboardLayout
      sx={{
        '& .MuiAppBar-root': {
          width: '100%',
          maxWidth: '100%',
        },
      }}
    >
      <PageContainer
        maxWidth={false}
        sx={{
          paddingLeft: { xs: 1, sm: 2, md: 3 },
          paddingRight: { xs: 1, sm: 2, md: 3 },
          marginTop: 2,
          marginBottom: 2,
          width: '100%',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            paddingLeft: { xs: 1, sm: 2, md: 3 },
            paddingRight: { xs: 1, sm: 2, md: 3 },
            marginTop: 2,
            marginBottom: 2,
            width: '100%',
          }}
        >
          {pages[router.pathname.replace('/', '')] || (
            pages[router.pathname.replace('/manageleave/', '')] || <div>Page not found</div>
          )}
        </Container>
      </PageContainer>
    </DashboardLayout>
  </AppProvider>
  );
}
