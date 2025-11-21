import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Card
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom'; // แก้ไข import ให้ถูกต้อง
import dayjs from "dayjs"; // นำเข้า dayjs สำหรับวันที่ปัจจุบัน

const userLevels = ["Admin", "Manager", "Employee"];
const statuses = ["Active", "Inactive"];
const RegisterForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [accountCreationDate, setAccountCreationDate] = useState(dayjs()); // กำหนดวันที่ปัจจุบันเป็นค่าเริ่มต้น


  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    // ตรวจสอบว่า newValue ไม่เป็น null และอัพเดตค่า
    if (newValue) {
      setAccountCreationDate(newValue); // อัพเดตค่าเมื่อมีการเปลี่ยนแปลง
    } else {
      setAccountCreationDate(dayjs()); // หากไม่มีการเลือกวันที่ ให้กำหนดเป็นวันที่ปัจจุบัน
    }
  };
  


  // ฟังก์ชันสำหรับตรวจสอบรหัสผ่านทันทีเมื่อมีการเปลี่ยนแปลง
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newPassword = e.target.value;
  //   setPassword(newPassword);    

  //   // ตรวจสอบว่า password กับ confirmPassword ตรงกันทันที
  //   if (newPassword !== confirmPassword) {
  //     setError("Passwords do not match!");
  //   } else {
  //     setError(""); // ล้างข้อความ error ถ้าตรงกัน
  //   }
  // };

  const handleChangesetPosition = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // ถ้า confirmPassword ว่าง, ล้างข้อความ error
    if (newConfirmPassword === "") {
      setError("");
    } else if (password !== newConfirmPassword) {
      setError("*กรุณากรอกรหัสผ่านให้เหมือนกัน !");
    } else {
      setError(""); // ล้างข้อความ error ถ้าตรงกัน
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ไม่มีการตรวจสอบความตรงกันใน submit เพราะตรวจสอบไว้แล้วใน onChange
    if (!error) {
      alert("Form Submitted Successfully!");
    }
  };


  const isMobile = useMediaQuery('(max-width:600px)'); // ตรวจสอบว่าหน้าจอเป็นมือถือหรือไ

  const handleChange = (event: SelectChangeEvent) => {
    setTitle(event.target.value as string);
  };

  const handleLoginClick = () => {
    navigate('/'); // เชื่อมโยงไปที่หน้า /add-leave
  };

   // ฟังก์ชัน format เบอร์โทรศัพท์
   const formatPhoneNumber = (value: string = ""): string => {
    // ลบตัวอักษรที่ไม่ใช่ตัวเลข
    const rawValue = value.replace(/\D/g, "");

    // จัดรูปแบบเบอร์โทรศัพท์
    if (rawValue.length <= 3) return rawValue;
    if (rawValue.length <= 6) return `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    return `${rawValue.slice(0, 3)}-${rawValue.slice(3, 6)}-${rawValue.slice(6, 10)}`;
  };

  // ฟังก์ชัน handleChangePhone สำหรับการจัดการเบอร์โทรศัพท์
  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value || "";

    // จัดรูปแบบเบอร์โทรศัพท์
    const formattedNumber = formatPhoneNumber(inputValue);

    // อัปเดตสถานะของเบอร์โทรศัพท์
    setPhoneNumber(formattedNumber);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // เพิ่มความสูงเต็มหน้าจอ
      }}
    >
      <Card
        sx={{
          
          p: 4,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          width: "100%",
          minHeight: "500px",
        }}
      >
        <Typography component="h1" variant="h4" align="center"  mb={4} fontWeight="bold">
          ลงทะเบียน
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* คำนำหน้า, ชื่อ, สกุล */}
          <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>ชื่อ</Typography>
          <Grid container spacing={isMobile ? 0 : 2} >
            <Grid item mb={2}  xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel id="title">คำนำหน้า</InputLabel>
              <Select
                labelId="title"
                id="title"
                value={title}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
                label="คำนำหน้า"
              >
                <MenuItem value="Mr.">นาย</MenuItem>
                <MenuItem value="Ms.">นางสาว</MenuItem>
                <MenuItem value="Mrs.">นาง</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item mb={2}  xs={12} sm={5}>
              <TextField
                fullWidth
                id="firstName"
                label="ชื่อ"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{sx: { borderRadius: 2 },}}
              />
            </Grid>
            <Grid item mb={2}  xs={12} sm={5} >
              <TextField
                fullWidth
                id="lastName"
                label="สกุล"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{sx: { borderRadius: 2 },}}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth variant="filled" margin="dense">
            <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 0.25 }}>อีเมล</Typography>
              <TextField
               required
               fullWidth
               id="email"
               label="Email"
               placeholder="Enter your email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               InputProps={{sx: { borderRadius: 2 },}}
              />
          </FormControl>

          <Grid container spacing={isMobile ? 0 : 2} >
            <Grid item mb={0}  xs={12} sm={6}>
            <FormControl fullWidth variant="filled" margin="dense">
            <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 0.25 }}>รหัสผ่าน</Typography>
              <TextField
              required
               id="password"
               label="Password"
               placeholder="Enter a password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               InputProps={{sx: { borderRadius: 2 },}}
              />
          </FormControl>
            </Grid>
            <Grid item mb={0}  xs={12} sm={6} >
              <FormControl fullWidth variant="filled" margin="dense">
              <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 0.25 }}>ยืนยันรหัสผ่าน</Typography>
                <TextField
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                InputProps={{sx: { borderRadius: 2 },}}
                />
                {/* แสดงข้อความ error หากรหัสผ่านไม่ตรงกัน */}
                {error && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
            </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth variant="filled" margin="dense">
            <Typography sx={{ fontSize: '16px', fontWeight: 600, mb: 0.25 }}>ตำแหน่ง</Typography>
            <FormControl fullWidth>
              <InputLabel id="position">ตำแหน่ง</InputLabel>
              <Select
                labelId="ตำแหน่ง"
                id="position"
                value={position}
                label="ตำแหน่ง"
                onChange={handleChangesetPosition}
                sx={{borderRadius: 2}}
              >
                <MenuItem value={400}>Dev</MenuItem>
                <MenuItem value={500}>Suppost</MenuItem>
                <MenuItem value={300}>testter</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
          <FormControl fullWidth variant="filled" margin="dense">
            <Typography 
              sx={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                mb: 0.5, 
                color: "text.primary" /* สีตัวอักษร */ 
              }}
            >
              เบอร์โทรศัพท์
            </Typography>
            <TextField
                fullWidth
                id="phoneNumber"
                label="เบอร์โทรศัพท์"
                placeholder="กรอกเบอร์โทรศัพท์"
                value={phoneNumber}
                onChange={handleChangePhone}
                variant="outlined" /* ใช้ outlined เพื่อให้ดูโมเดิร์น */
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
          </FormControl>
          <FormControl fullWidth margin="dense" sx={{ mb: 0.25 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography 
                sx={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  mb: 0.5, 
                  color: "text.primary" 
                }}
              >
                วันที่เริ่มทำงาน
              </Typography>
              <DesktopDatePicker
                label="วันที่เริ่มทำงาน"
                value={startDate}
                //onChange={(newValue) => setStartDate(newValue)} /* เปิดใช้งานการเปลี่ยนค่า */
                slotProps={{
                  textField: { 
                    fullWidth: true, 
                    size: 'medium',
                    sx: {"& .MuiOutlinedInput-root": { borderRadius: 2,},},
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth variant="filled" margin="dense">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ fontSize: '16px', fontWeight: 600,mb: 0.25 }}>วันที่สร้างบัญชี</Typography>
              <DesktopDatePicker
                  label="วันที่สร้างบัญชี"
                  value={accountCreationDate}
                  onChange={handleDateChange}
                  slotProps={{ textField: { fullWidth: true, size: 'medium',sx: {"& .MuiOutlinedInput-root": { borderRadius: 2,},}, } }}
                  
                />
            </LocalizationProvider>
          </FormControl>
          {/* Submit Button */}
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              gap: 2, /* ระยะห่างระหว่างปุ่ม */
              mt: 4 /* ระยะห่างด้านบน */
            }}
          >
             <Button
              type="button"
              variant="contained"
              color="error"
              sx={{
                borderRadius: "16px", // มุมโค้ง
                width: "auto", // ความกว้างของปุ่ม
                height: "50px", // ความสูงของปุ่ม
                fontSize: "18px", // ขนาดตัวอักษร
              }}
              onClick={handleLoginClick}
            >
              ยกเลิก
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "16px", // มุมโค้ง
                width: "auto", // ความกว้างของปุ่ม
                height: "50px", // ความสูงของปุ่ม
                fontSize: "18px", // ขนาดตัวอักษร
              }}
            >
              ลงทะเบียน
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default RegisterForm;
