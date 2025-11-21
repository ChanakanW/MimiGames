import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

export default function NotificationOfLeave() {
  const [leaveType, setLeaveType] = useState('');
  const [prefix, setPrefix] = useState('');
  const [approver, setApprover] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [reason, setReason] = useState('');

  const handleLeaveTypeChange = (event: SelectChangeEvent) => setLeaveType(event.target.value);
  const handlApprovere = (event: SelectChangeEvent) => setApprover(event.target.value);
  const handlePrefixChange = (event: SelectChangeEvent) => setPrefix(event.target.value);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };
  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReason(event.target.value);

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const isMobile = useMediaQuery('(max-width:600px)'); // ตรวจสอบว่าหน้าจอเป็นมือถือหรือไ

  return (
    <Card   sx={{
      p: 2,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',  // เพิ่มเงา
      borderRadius: '12px',                          // มุมโค้ง
        }}>
      <Box sx={{ bgcolor: 'background.paper', p: 2, width: '100%', overflow: 'hidden',borderRadius: '12px', }}>
        
        {/* Divider */}
        <Divider sx={{ borderColor: '#03a9f4', borderWidth: '2px', mt: 2, mb: 2 }} />
        
        <Grid container spacing={isMobile ? 0 : 2} sx={{ mt: 2 }}>
          {/* Start Date */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>ประเภทการลา</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel id="leave-type-label">ประเภทการลา</InputLabel>
                <Select
                  labelId="leave-type-label"
                  id="leave-type"
                  value={leaveType}
                  label="ประเภทการลา"
                  onChange={handleLeaveTypeChange}
                >
                  <MenuItem value="sick">ลาป่วย</MenuItem>
                  <MenuItem value="personal">ลากิจ</MenuItem>
                  <MenuItem value="other">อื่นๆ..</MenuItem>
                </Select>
              </FormControl>
            </LocalizationProvider>
          </Grid>
          {/* End Date */}
          <Grid  item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>ผู้อนุมัติการลา</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel id="leave-type-label">ผู้อนุมัติการลา</InputLabel>
                <Select
                  labelId="leave-type-label"
                  id="leave-type"
                  value={approver}
                  label="ผู้อนุมัติการลา"
                  onChange={handlApprovere}
                >
                  <MenuItem value="one">คุณ หนึง</MenuItem>
                  <MenuItem value="two">คุณ สอง</MenuItem>
                  <MenuItem value="three">คุณ สาม</MenuItem>
                </Select>
              </FormControl>
            </LocalizationProvider>
          </Grid>
        </Grid>
        {/* Personal Information */}
        <Grid container spacing={isMobile ? 0 : 2} sx={{ mt: 2 }}>
          {/* Prefix Selection */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '16px',fontWeight: 600  }}>คำนำหน้า</Typography>
            <FormControl fullWidth>
              <InputLabel id="prefix-label">คำนำหน้า</InputLabel>
              <Select
                labelId="prefix-label"
                id="prefix"
                value={prefix}
                label="คำนำหน้า"
                onChange={handlePrefixChange}
              >
                <MenuItem value="mr">นาย</MenuItem>
                <MenuItem value="mrs">นาง</MenuItem>
                <MenuItem value="ms">นางสาว</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* First Name */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '16px',fontWeight: 600 }}>ชื่อ</Typography>
            <TextField
              label="ชื่อ"
              id="first-name"
              variant="outlined"
              fullWidth
              size="medium"
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '16px',fontWeight: 600 }}>สกุล</Typography>
            <TextField
              label="สกุล"
              id="last-name"
              variant="outlined"
              fullWidth
              size="medium"
            />
          </Grid>
        </Grid>

        {/* Date Selection */}
        <Grid container spacing={isMobile ? 0 : 2} sx={{ mt: 2 }}>
          {/* Start Date */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ fontSize: '16px',fontWeight: 600 }}>วันที่ต้องการลา</Typography>
              <DesktopDatePicker
                label="วันที่ต้องการลา"
                value={startDate}
                //onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: true, size: 'medium' } }}
              />
            </LocalizationProvider>
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ fontSize: '16px',fontWeight: 600 }}>ถึงวันที่</Typography>
              <DesktopDatePicker
                label="ถึงวันที่"
                value={endDate}
                //onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: true, size: 'medium' } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Reason for Leave */}
        <FormControl fullWidth variant="filled" margin="normal">
          <Typography sx={{ fontSize: '16px',fontWeight: 600 }}>เหตุผลการลา</Typography>
          <TextField
            id="reason"
            label="อธิบายเหตุผลการลา"
            multiline
            rows={4}
          />
        </FormControl>
        <Card sx={{ // เพิ่มพื้นหลังเพื่อให้กล่องโดดเด่นขึ้น
          padding: 2, // เพิ่มระยะห่างด้านใน
          borderRadius: '12px' // ปรับขอบกล่องให้โค้งมน
          }}
          >
        <Button
            component="label"
            variant="contained"
            sx={{
              backgroundColor: ' #00a152',
              color: 'white',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#00e676',
              },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 24, mr: 1 }} />
              อัพโหลดไฟล์
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>

          {/* Display selected files with delete button */}
        {selectedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              ไฟล์ที่เลือก:
            </Typography>

            {selectedFiles.map((file, index) => (
              <Paper
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  marginBottom: '12px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                {/* File Preview and Details */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Image Preview */}
                  {file.type.startsWith('image/') && (
                    <Box
                      component="img"
                      src={URL.createObjectURL(file)}
                      alt="file preview"
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '8px',
                        objectFit: 'cover',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  )}

                  {/* File Details */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      overflow: 'hidden',
                    }}
                  >
                    {/* File Name */}
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '300px',
                      }}
                    >
                      ชื่อไฟล์: {file.name}
                    </Typography>

                    {/* File Size and Type */}
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: '#757575',
                        marginTop: '4px',
                      }}
                    >
                      ขนาดไฟล์: {(file.size / 1024).toFixed(2)} KB | ประเภทไฟล์: {file.type || 'ไม่ระบุ'}
                    </Typography>
                  </Box>
                </Box>

                {/* Close Button */}
                <Button
                    onClick={() => removeFile(index)}
                    sx={{
                      minWidth: '40px',
                      height: '40px', // ความสูงเท่ากับความกว้าง
                      width: '40px',
                      padding: 0,
                      borderRadius: '50%', // ทำให้เป็นวงกลม
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: 'rgba(126, 120, 120, 0.1)', // สี hover แบบจาง
                      },
                    }}
                  >
                    
                  <CloseOutlinedIcon sx={{ fontSize: 28 }} />
                </Button>
              </Paper>
            ))}
          </Box>
        )}
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" sx={{color: 'white',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: '8px',}}><SaveAltOutlinedIcon sx={{ fontSize: 24, mr: 1 }} /> บันทึกการลา</Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
