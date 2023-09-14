const loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => {
    if (res.status !== 200) return res.text()
    return res.json();
  }).then(payload => {
    if (typeof payload == 'string') return alert(payload);
    return window.location.replace('/');
  })
  .catch(err => {
    return `Catch error: ${err}`
  });
});
