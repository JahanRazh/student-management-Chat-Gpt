import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "./api/studentsApi.js";

export default function App() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (e) {
      setMsg(e?.response?.data?.message || "Failed to load students");
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(payload) {
    setMsg("");
    try {
      if (selected) await updateStudent(selected._id, payload);
      else await createStudent(payload);

      setSelected(null);
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "Request failed");
    }
  }

  async function handleDelete(id) {
    setMsg("");
    try {
      await deleteStudent(id);
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", fontFamily: "Arial" }}>
      <h2>Student Management System (MERN CRUD)</h2>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}

      <StudentForm onSubmit={handleSubmit} selected={selected} onCancel={() => setSelected(null)} />
      <StudentTable students={students} onEdit={setSelected} onDelete={handleDelete} />
    </div>
  );
}
