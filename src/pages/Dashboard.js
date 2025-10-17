import { useState } from "react";
import "../css/Dashboard.css";
import {
  FaUsers,
  FaFolderOpen,
  FaCalendarAlt,
  FaUserPlus,
  FaFolderPlus,
} from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { GrInProgress } from "react-icons/gr";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(4);
  const [totalProjects, setTotalProjects] = useState(4);
  const [upcomingDeadline] = useState("Mar 31, 2027");

  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: "Varsha", role: "Admin", status: "Online" },
    { id: 2, name: "Rajesh Kumar", role: "Manager", status: "Offline" },
    { id: 3, name: "Aruna", role: "User", status: "Online" },
    { id: 4, name: "Maya", role: "User", status: "Offline" },
  ]);

  const [recentProjects, setRecentProjects] = useState([
    {
      id: 1,
      title: "Project 1",
      status: "In Progress",
      deadline: "Apr 15, 2024",
    },
    {
      id: 2,
      title: "Project 2",
      status: "Completed",
      deadline: "Mar 10, 2024",
    },
    {
      id: 3,
      title: "Project 3",
      status: "In Progress",
      deadline: "Feb 28, 2024",
    },
    {
      id: 4,
      title: "Project 4",
      status: "Completed",
      deadline: "Apr 28, 2024",
    },
  ]);

  //  Delete user
  const deleteUser = (id) => {
    setRecentUsers(recentUsers.filter((user) => user.id !== id));
    setTotalUsers(totalUsers - 1);
  };

  //  Delete project
  const deleteProject = (id) => {
    setRecentProjects(recentProjects.filter((project) => project.id !== id));
    setTotalProjects(totalProjects - 1);
  };
  // User Modal
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("User");

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUserName.trim() === "") return;

    const newUser = {
      id: Date.now(),
      name: newUserName,
      role: newUserRole,
      status: "Online",
    };
    setRecentUsers([newUser, ...recentUsers]);
    setTotalUsers(totalUsers + 1);
    setNewUserName("");
    setNewUserRole("User");
    setShowUserModal(false);
  };
  // Project Model
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProjectTitle.trim() === "" || newDeadline.trim() === "") return;

    const newProject = {
      id: Date.now(),
      title: newProjectTitle,
      status: "In Progress",
      deadline: newDeadline,
    };
    setRecentProjects([newProject, ...recentProjects]);
    setTotalProjects(totalProjects + 1);
    setNewProjectTitle("");
    setNewDeadline("");
    setShowProjectModal(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>

      {/* Top Cards */}
      <div className="top-cards">
        <div className="card users">
          <FaUsers className="icon" />
          <div>
            <h3>Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>

        <div className="card projects">
          <FaFolderOpen className="icon" />
          <div>
            <h3>Projects</h3>
            <p>{totalProjects}</p>
          </div>
        </div>

        <div className="card deadline">
          <FaCalendarAlt className="icon" />
          <div>
            <h3>Upcoming Deadline</h3>
            <p>{upcomingDeadline}</p>
          </div>
        </div>

        <div className="card create">
          <button className="create-btn" onClick={() => setShowUserModal(true)}>
            <FaUserPlus /> Create User
          </button>
          <button
            className="create-btn"
            onClick={() => setShowProjectModal(true)}
          >
            <FaFolderPlus /> Create Project
          </button>
        </div>
      </div>

      {/* Bottom Tables */}
      <div className="bottom-section">
        <div className="recent">
          <h3>Recent Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`status-dot ${
                        user.status === "Online" ? "online" : "offline"
                      }`}
                    ></span>
                    {user.status}
                  </td>
                  <td>
                    <button type="button" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Projects Table */}
        <div className="recent">
          <h3>Recent Projects</h3>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>
                    {project.status === "Completed" ? (
                      <span>
                        <TiTick
                          style={{ color: " #16a34a", fontSize: "20px" }}
                        />{" "}
                        {project.status}
                      </span>
                    ) : (
                      <span>
                        <GrInProgress
                          style={{ color: "#eab308", fontSize: "20px" }}
                        />{" "}
                        {project.status}
                      </span>
                    )}
                  </td>
                  <td>{project.deadline}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <input
                type="text"
                placeholder="Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
              />
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Add User
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Project</h3>
            <form onSubmit={handleAddProject}>
              <input
                type="text"
                placeholder="Project Title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Project Deadline"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Add Project
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
