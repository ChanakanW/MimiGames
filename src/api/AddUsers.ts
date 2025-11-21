import axios from "axios";

const API_URL = "http://localhost:5092/api/AddUsers"; // URL ของ .NET API

// ฟังก์ชันสำหรับเพิ่มa Product
export const AddUsers = async (Users: { Title: string;name: string ;Sname : string; Email: string;PassWord: string; Phone: string; DateEmployed: string; DateCreated: string}) => {
  try {
    const response = await axios.post(API_URL, Users);
    return response.data;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};
