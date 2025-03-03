import connectDB from "../../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await connectDB();

    if (!name || !email || !password) {
      throw new Error("Please provide name, email and password");
    }

    const userExistWithSameEmail = await User.findOne({
      email,
    });

    if (userExistWithSameEmail) {
      throw new Error("A User already exists with this email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: "",
      provider: "credentials",
    });
    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "User registered successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
