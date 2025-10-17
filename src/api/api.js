import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com"; 

export const fetchUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const fetchProjects = async () => {
  return [
    { id: 1, title: "Project A" },
    { id: 2, title: "Project B" }
  ];
};