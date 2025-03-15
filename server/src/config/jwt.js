export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  options: {
    expiresIn: "7d",
  },
};
