"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import HeaderElement from "@/components/HeaderElement";
import ButtonElement from "@/components/ButtonElement";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan Password wajib diisi!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const validUser = existingUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (validUser) {
      alert(`Login berhasil! Selamat datang, ${validUser.username}.`);
      
      localStorage.setItem("currentUser", JSON.stringify(validUser));

      router.push("/dashboard");
    } else {
      alert("Email atau Password salah!");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col p-[32px] gap-[32px]">
        <HeaderElement elements={
          <ButtonElement icon={ <ArrowLeft className="w-7 h-7" /> } destination="/" />
        } />
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-h3 text-neutral-900 font-medium leading-tight">Welcome Back</h1>
          <p className="text-body text-neutral-700">Sign in to continue your learning journey ✨</p>
        </div>
      </div>

      <form className="w-full bg-neutral-50 h-screen p-[32px] flex flex-col items-center" onSubmit={handleLogin}>

        <div className="w-full flex flex-col items-center pt-[190px]">

          <Image src="/images/mascot-auth.png" alt="Fenyman AI Mascot Welcoming" width={ 250 } height={ 250 } priority className="z-10 absolute top-[252px] object-contain" />

          <div className="w-full flex flex-col gap-3 bg-transparent">

            {/* Input Email */}
            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 text-body text-neutral-700 placeholder-neutral-400 outline-none"
              />
            </div>

            {/* Input Password */}
            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <input
                required
                type={showPassword ? "text" : "password"}
                min={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="flex-1 text-body text-neutral-700 placeholder-neutral-400 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-[60px] h-[60px] flex items-center justify-center outline-none">
                {
                  showPassword ? <EyeOff className="w-7 h-7 stroke-neutral-400" /> : <Eye className="w-7 h-7 stroke-neutral-400" />
                }
              </button>
            </div>

          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-4 mt-[32px]">
          <button type="submit" className="w-full bg-primary-500 text-white text-body p-[16px] rounded-full flex items-center justify-center font-medium">
            Sign In
          </button>
          <p className="text-body text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-500 font-medium">
              Sign Up
            </Link>
          </p>
        </div>

      </form>
    </>
  );
}
