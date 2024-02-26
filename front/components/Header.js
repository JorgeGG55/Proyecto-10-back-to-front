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
            <span id="mobile-menu-toggle">&#9776;</span>
            <h1 id="title">Event Click</h1>
            <div id="mySidenav" class="sidenav">
              <a href="javascript:void(0)" class="closebtn" id="closebtn">&times;</a>
              ${navContent}
            </div>
        </header>
    `;

  document.addEventListener("click", function (event) {
    const isMobile = window.innerWidth <= 768;

    if (event.target.matches("#title")) {
      window.location.reload();
    } else if (event.target.matches("#mobile-menu-toggle")) {
      document.getElementById("mySidenav").style.width = "100%";
    } else if (event.target.matches("#closebtn")) {
      document.getElementById("mySidenav").style.width = "0";
    } else if (event.target.matches("#nav-ul a") && isMobile) {
      document.getElementById("mySidenav").style.width = "0";
    }
  });

  return headerContent;
};

export default Header;
