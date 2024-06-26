import { connect } from "http2";
import { NextResponse } from "next/server";
import User from "@/models/user"
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        console.log("Starting POST request");
        const { name, email, password } = await req.json();
        console.log("Parsed request body");

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        console.log("About to connect to MongoDB");
        await connectMongoDB();
        console.log("Connected to MongoDB");

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role: "user" });

        console.log("User registration successful");
        return NextResponse.json({ message: "User Registered" }, { status: 201 });

    } catch (error) {
        console.error("Detailed error:", error);
        return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
    }
}