import { useState, useEffect } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import { fetchProjects } from "../api/api";
import "../css/Table.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [editingProjectId, setEditingProjectId] = useState(null); // Track editing

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Project title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addOrEditProject = () => {
    if (!validate()) return;

    if (editingProjectId) {
      // Edit project
      setProjects(
        projects.map((p) => (p.id === editingProjectId ? { ...p, title } : p))
      );
      setEditingProjectId(null);
    } else {
      // Add project
      setProjects([...projects, { id: Date.now(), title }]);
    }

    setTitle("");
    setErrors({});
  };

  const deleteProject = (id) =>
    setProjects(projects.filter((p) => p.id !== id));

  const editProject = (project) => {
    setTitle(project.title);
    setEditingProjectId(project.id);
  };

  return (
    <Container className="mt-5">
      <h2>Projects</h2>
      <Form
        className="mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          addOrEditProject();
        }}
      >
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">
          {editingProjectId ? "Save Changes" : "Add Project"}
        </Button>
        {editingProjectId && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => {
              setEditingProjectId(null);
              setTitle("");
              setErrors({});
            }}
          >
            Cancel
          </Button>
        )}
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => editProject(p)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteProject(p.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
