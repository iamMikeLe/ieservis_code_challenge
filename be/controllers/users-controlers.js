const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "user@email.com" && password === "userPassword") {
    return res.json({
      email,
      type: "user",
    });
  }

  const errorResponse = {
    status: "error",
    statusCode: 401,
    message: "Invalid credentials",
  };

  return res.status(401).json(errorResponse);
};

exports.login = login;
