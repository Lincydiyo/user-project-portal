import "../css/UserHomePage.css";

export default function UserHomePage() {
  return (
    <div className="userHomeContainer">
      <img src="https://cdn.wallpapersafari.com/99/64/yCY3ci.jpg" alt="Home Background" className="backgroundImage" />
      <div className="overlayText">
        <h1>Welcome to the Portal</h1>
        <p>Access your projects, profile, and other resources here.</p>
      </div>
    </div>
  );
}
