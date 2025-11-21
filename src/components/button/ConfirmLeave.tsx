import React from 'react'

export default function ConfirmLeave() {
  return (
    <div>ConfirmLeave</div>
  )
}

// import Swal from "sweetalert2";
// import Button from "@mui/material/Button";

// export default function ConfirmLeave() {

//   const handleConfirmClick = async () => {
//     const result = await Swal.fire({
//       title: "ยืนยันการลา",
//       text: "คุณต้องการยืนยันการลาใช่ไหม?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "ใช่, ยืนยัน",
//       cancelButtonText: "ไม่ใช่"
//     });

//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "สำเร็จ!",
//         text: "การยืนยันการลาถูกบันทึกเรียบร้อยแล้ว.",
//         icon: "success"
//       });
//     } else {
//       Swal.fire({
//         title: "ยกเลิก",
//         text: "คุณได้ยกเลิกการยืนยันการลา.",
//         icon: "info"
//       });
//     }
//   };

//   return (
//     <Button
//       variant="contained"
//       color="primary"
//       onClick={handleConfirmClick}
      
//       sx={{
//         fontWeight: 600,
//         padding: '12px 24px',
//         '&:hover': {
//           backgroundColor: '#5393ff',
//         }
//       }}
//     >
//       ยืนยันการลา
//     </Button>
//   );
// }
