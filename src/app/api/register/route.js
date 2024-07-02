import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        console.log("Starting POST request");
        const { name, email, password } = await req.json();
        console.log("Parsed request body: ", { name, email });

        if (!name || !email || !password) {
            console.log("Missing required fields");
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        console.log("About to connect to MongoDB");
        await connectMongoDB();
        console.log("Connected to MongoDB");

        const existingUser = await User.findOne({ email });
        console.log("Checked for existing user");

        if (existingUser) {
            console.log("User already exists");
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        console.log("Hashing password");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        await User.create({ name, email, password: hashedPassword, role: "user" });
        console.log("User created in database");

        return NextResponse.json({ message: "User Registered" }, { status: 201 });
    } catch (error) {
        console.error("Detailed error:", error);
        return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
    }
}