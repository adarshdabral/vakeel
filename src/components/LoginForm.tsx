import Link from "next/link";

export default function LoginForm() {
    return (
        <div className="grid place-items-center">
            <div className="shadow-lg rounded-lg border-t-4 border-green-400 w-1/2 mx-auto my-10">
                <h1 className="text-xl font-bold my-4">Please Register</h1>
                <form className="flex flex-col gap-3">
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">Error Message</div>
                    <Link className="text-sm mt-3 text-right" href="/register">
                        Don&apos;t have an account? <span className="underline font-bold">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
