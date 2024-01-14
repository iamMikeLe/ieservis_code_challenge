const users = [
  { email: "user@email.com", password: "userPassword", type: "user" },
  { email: "admin@email.com", password: "adminPassword", type: "admin" },
  {},
];
const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

module.exports = getUserByEmail;
