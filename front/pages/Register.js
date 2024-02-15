const Register = () => {
  const handleRegister = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        "Error durante el registro. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "register-form") {
      handleRegister(event);
    }
  });

  return `
    <form id="register-form">
      <input type="text" id="name" name="name" placeholder="Name" required><br>
      <input type="email" id="email" name="email" placeholder="Email" required><br>
      <input type="password" id="password" name="password" placeholder="Password" required><br><br>
      <button type="submit" id="register-button">Register</button>
    </form>
  `;
};

export default Register;
