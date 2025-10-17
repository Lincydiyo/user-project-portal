import { useState, useEffect } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import { fetchUsers } from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null); // Track editing user

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.length < 3) newErrors.name = "Name must be at least 3 characters";
    else if (name.length > 30) newErrors.name = "Name must be less than 30 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addOrEditUser = () => {
    if (!validate()) return;

    if (editingUserId) {
      // Edit existing user
      setUsers(users.map(u => u.id === editingUserId ? { ...u, name, email } : u));
      setEditingUserId(null);
    } else {
      // Add new user
      setUsers([...users, { id: Date.now(), name, email }]);
    }

    setName("");
    setEmail("");
    setErrors({});
  };

  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUserId(user.id);
  };

  return (
    <Container className="mt-5">
      <h2>Users</h2>
      <Form className="mb-3" onSubmit={e => { e.preventDefault(); addOrEditUser(); }}>
        <Form.Group className="mb-2">
          <Form.Control 
            placeholder="Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">{editingUserId ? "Save Changes" : "Add User"}</Button>
        {editingUserId && (
          <Button 
            variant="secondary" 
            className="ms-2" 
            onClick={() => { setEditingUserId(null); setName(""); setEmail(""); setErrors({}); }}
          >
            Cancel
          </Button>
        )}
      </Form>

      <Table striped bordered>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => editUser(u)}>Edit</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => deleteUser(u.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
