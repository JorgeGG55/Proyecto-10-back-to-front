const Header = () => {
  const token = localStorage.getItem("token");

  let navContent = ``;

  if (token) {
    navContent += `
            <ul id="nav-ul">
                <li><a href="#" id="events-link">Events</a></li>
                <li><a href="#" id="my-events-link">My events</a></li>
                <li><a href="#" id="create-event-link">+ Create Event</a></li>
                <li><a href="#" id="profile-link">Profile</a></li>
                <li><a href="#" id="logout-link">Logout</a></li>
            </ul>
        `;
  } else {
    navContent += `
            <ul id="nav-ul">
                <li><a href="#" id="events-link">Events</a></li>
                <li><a href="#" id="login-link">Login</a></li>
                <li><a href="#" id="register-link">Register</a></li>
            </ul>
        `;
  }

  const headerContent = `
        <header>
            <h1>Event Click</h1>
            <nav>
                ${navContent}
            </nav>
        </header>
    `;

  return headerContent;
};

export default Header;
