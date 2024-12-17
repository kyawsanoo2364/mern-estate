export const testUserApi = async (req, res) => {
  try {
    res.json({ message: "Test User Api Route" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};
