const user = {
  email: "admin@admin.com",
  password: "admin",
};

export default function isValid(email, password) {
  return email === user.email && password === user.password;
}
