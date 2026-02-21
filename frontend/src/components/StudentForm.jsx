import { useEffect, useState } from "react";

export default function StudentForm({ onSubmit, selected, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", course: "" });

  useEffect(() => {
    if (selected) setForm({ name: selected.name, email: selected.email, course: selected.course });
    else setForm({ name: "", email: "", course: "" });
  }, [selected]);

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3>{selected ? "Update Student" : "Add Student"}</h3>

      <div style={{ display: "grid", gap: 8 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button type="submit">{selected ? "Update" : "Create"}</button>
        {selected && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
