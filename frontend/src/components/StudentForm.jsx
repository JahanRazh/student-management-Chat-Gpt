import { useEffect, useState } from "react";

export default function StudentForm({ onSubmit, selected, onCancel }) {
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selected) setForm({ name: selected.name, email: selected.email, course: selected.course });
    else setForm({ name: "", email: "", course: "" });
    setErrors({});
  }, [selected]);

  function validateField(name, value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if ((name === "name" || name === "course") && trimmedValue.length < 2) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters`;
    }

    if ((name === "name" || name === "course") && trimmedValue.length > 60) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at most 60 characters`;
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmedValue)) {
        return "Email must be valid";
      }
    }

    return "";
  }

  function validateForm(currentForm) {
    const nextErrors = {
      name: validateField("name", currentForm.name),
      email: validateField("email", currentForm.email),
      course: validateField("course", currentForm.course)
    };

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      course: form.course.trim()
    };

    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3>{selected ? "Update Student" : "Add Student"}</h3>

      <div style={{ display: "grid", gap: 8 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        {errors.name && <small style={{ color: "crimson" }}>{errors.name}</small>}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        {errors.email && <small style={{ color: "crimson" }}>{errors.email}</small>}
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        {errors.course && <small style={{ color: "crimson" }}>{errors.course}</small>}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button type="submit">{selected ? "Update" : "Create"}</button>
        {selected && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
