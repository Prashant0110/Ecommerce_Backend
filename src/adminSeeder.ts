import bcrypt from "bcrypt";
import User from "./models/userModel";

const adminSeeder = async (): Promise<void> => {
  const [data] = await User.findAll({
    where: {
      email: "aoneadmin@gmail.com",
    },
  });
  if (!data) {
    await User.create({
      email: "aoneadmin@gmail.com",
      password: bcrypt.hashSync("aonepassword", 8),
      username: "aoneadmin",
      role: "admin",
    });
    console.log("admin credentials seeded successfully");
  } else {
    console.log("admin credentials already seeded!");
  }
};

export default adminSeeder;
