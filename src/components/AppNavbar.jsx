import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/AppNavbar.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBrandClick = () => {
    if (user?.role === "admin") navigate("/dashboard");
    else if (user?.role === "manager") navigate("/projects");
    else navigate("/profile");
  };

  return (
    <Navbar expand="lg" className="mainNav">
      <Container fluid>
        {/* Left brand */}
        <Navbar.Brand className="navbarBrand" onClick={handleBrandClick}>
          {location.pathname === "/dashboard"
            ? "User & Project Dashboard"
            : "User & Project Portal"}
        </Navbar.Brand>

        {/* Toggle button */}
        <Navbar.Toggle className="toggleBtn" />

        <Navbar.Collapse className="justify-content-end">
          <Nav className="d-flex align-items-center">
            {user && user.role === "admin" && (
              <>
                <Nav.Link onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/profile")}>
                  Profile
                </Nav.Link>
              </>
            )}
            {user && user.role === "manager" && (
              <>
                <Nav.Link onClick={() => navigate("/projects")}>
                  Projects
                </Nav.Link>
                  <Nav.Link onClick={() => navigate("/users")}>
                  Users
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/profile")}>
                  Profile
                </Nav.Link>
              </>
            )}
            {user && user.role === "user" && (
              <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
            )}
            {user && (
              <Button className="btn-logout ms-2" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
