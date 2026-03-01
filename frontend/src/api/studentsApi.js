import axios from "axios";

const API_BASE = "http://localhost:5000";
const STUDENTS_ENDPOINT = `${API_BASE}/api/students`;

export async function fetchStudents() {
  const res = await axios.get(STUDENTS_ENDPOINT);
  return res.data;
}

export async function createStudent(payload) {
  const res = await axios.post(STUDENTS_ENDPOINT, payload);
  return res.data;
}

export async function updateStudent(id, payload) {
  const res = await axios.put(`${STUDENTS_ENDPOINT}/${id}`, payload);
  return res.data;
}

export async function deleteStudent(id) {
  const res = await axios.delete(`${STUDENTS_ENDPOINT}/${id}`);
  return res.data;
}
