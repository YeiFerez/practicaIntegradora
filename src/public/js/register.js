const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(registerForm);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 401) {
      alert(`The email you entered already exists. Please use a different email.`);
    } else {
      alert(`Registration successful! You can now log in.`);
      window.location.replace("/");
    }
  }).catch((err) => {
    alert(`An error occurred: ${err}`);
  });
});
