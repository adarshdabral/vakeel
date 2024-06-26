'use client';

import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
const [role, setRole] = useState("user"); 
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        
        try {
            if (!name || !email || !password || !role) {
                setError("All fields are necessary");
                return;
            }
    
            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, role }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                console.log("Registration successful:", data.message);
                setName("");
                setEmail("");
                setPassword("");
                setRole("user");
                setError("");
                setSuccessMessage(data.message || "Registration successful!");
            } else {
                console.error("Registration failed:", data.message);
                 setError(data.message || "Registration failed");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("Error during registration: " + (error instanceof Error ? error.message : String(error)));
            setSuccessMessage("");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg border-t-4 border-green-400 w-full max-w-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Full Name</label>
                    <input 
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    />
                </div>
                <div className="mt-3">
                    <h2 className="text-center font-semibold mb-2">Choose your role</h2>
                    <div className="flex flex-col">
                        <label className="flex items-center space-x-2 font-bold">
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={role === "user"}
                                onChange={(e) => setRole(e.target.value)}
                                className="mr-1"
                            />
                            <span>User</span>
                        </label>
                        <label className="flex items-center space-x-2 font-bold">
                            <input
                                type="radio"
                                name="role"
                                value="lawyer"
                                checked={role === "lawyer"}
                                onChange={(e) => setRole(e.target.value)}
                                className="mr-1"
                            />
                            <span>Lawyer</span>
                        </label>
                    </div>
                </div>
                <button 
                    className="w-full bg-green-600 text-white font-bold py-2 rounded mt-3 hover:bg-green-700 focus:outline-none focus:bg-green-700"
                    type="submit"
                >
                    Register
                </button>
                {error && (
    <div className="bg-red-500 text-white text-center py-2 rounded mt-2">
        {error}
    </div>
)}
{successMessage && (
    <div className="bg-green-500 text-white text-center py-2 rounded mt-2">
        {successMessage}
    </div>
)}
                <Link className="text-sm mt-3 text-center block text-blue-600 hover:underline" href='/'>
                    Already have an account? <span className="font-bold">Login</span>
                </Link>
            </form>
        </div>
    </div>
    );
}
