import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
   <main>
    <LoginForm/>
   </main>
  );
}

module.exports = {
  async headers() {
    return [
      {
        // Apply the CSP to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'",
          },
        ],
      },
    ];
  },
};
