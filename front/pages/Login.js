const handleLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("token", data.token);
      window.location.reload();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert(
      "Error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde."
    );
  }
};

document.addEventListener("submit", function (event) {
  if (event.target && event.target.id === "login-form") {
    handleLogin(event);
  }
});

const Login = () => {
  return `
    <form id="login-form">
      <input type="email" id="email" name="email" placeholder="Email" required><br>
      <input type="password" id="password" name="password" placeholder="Password" required><br><br>
      <button type="submit" id="login-button">Login</button>
    </form>
  `;
};

export default Login;
