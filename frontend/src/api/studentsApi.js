import axios from "axios";

const API_BASE = "http://localhost:5000";

export async function fetchStudents() {
  const res = await axios.get(`${API_BASE}/students`);
  return res.data;
}

export async function createStudent(payload) {
  const res = await axios.post(`${API_BASE}/students`, payload);
  return res.data;
}

export async function updateStudent(id, payload) {
  const res = await axios.put(`${API_BASE}/students/${id}`, payload);
  return res.data;
}

export async function deleteStudent(id) {
  const res = await axios.delete(`${API_BASE}/students/${id}`);
  return res.data;
}
