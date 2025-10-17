import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "../css/UserHomePage.css";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container className="profile-container">
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="profile-img"
        />
        <h2 className="profile-header">Hi {user.name}</h2>
        <p>Role: {user.role}</p>
      </div>
    </Container>
  );
}
