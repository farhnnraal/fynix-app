"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeaderElement from "@/components/HeaderElement";
import ButtonElement from "@/components/ButtonElement";


export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Semua field harus diisi!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const isUserExist = existingUsers.some(
      (u: any) => u.email === email || u.username === username
    );
    if (isUserExist) {
      alert("Username atau Email sudah terdaftar!");
      return;
    }

    const newUserId = `usr_${existingUsers.length + 1}`;

    const newUser = {
      user_id: newUserId,
      username: username,
      email: email,
      password: password,
    };

    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("User berhasil di registrasi.");

    setUsername("");
    setEmail("");
    setPassword("");

    router.push("/dashboard");
  };

  return (
    <>
      <div className="w-full flex flex-col p-[32px] gap-[32px]">
        <HeaderElement elements={ 
          <ButtonElement icon={ <ArrowLeft className="w-7 h-7" /> } destination="/" />
        } />
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-h3 text-neutral-900 font-medium leading-tight">Create Your Account</h1>
          <p className="text-body text-neutral-700">Start your learning journey with Fenyman AI ✨</p>
        </div>
      </div>

      <form className="w-full bg-neutral-50 h-screen p-[32px] flex flex-col items-center" onSubmit={handleRegister}>
      
        {/* Login Form */}
        <div className="w-full flex flex-col items-center mt-4 grow">
          
          <div className="w-[220px] h-[220px] relative -mb-[26.5px] z-10">
            <Image src="/images/mascot-auth.png" alt="Fenyman AI Mascot Welcoming" fill priority className="object-contain" />
          </div>

          <div className="w-full flex flex-col gap-3 bg-transparent">

            {/* Input Username */}
            <div className="w-full relative flex items-center">
              <span className="absolute left-[16px] text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="w-full bg-white border border-neutral-200 rounded-[12px] pl-[48px] pr-[16px] py-[14px] text-body text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
              />
            </div>

            {/* Input Email */}
            <div className="w-full relative flex items-center">
              <span className="absolute left-[16px] text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address"
                className="w-full bg-white border border-neutral-200 rounded-[12px] pl-[48px] pr-[16px] py-[14px] text-body text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
              />
            </div>

            {/* Input Password */}
            <div className="w-full relative flex items-center">
              <span className="absolute left-[16px] text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </span>
              
              <input
                type={showPassword ? "text" : "password"}
                min={8}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-[12px] pl-[48px] pr-[48px] py-[14px] text-body text-neutral-800 placeholder-neutral-400 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
              />

              {/* Tombol Mata (Show/Hide Password) */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[16px] text-neutral-400 hover:text-neutral-600 outline-none">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex flex-col items-center gap-3 mb-4">
          
          <button type="submit" className="w-full bg-primary-500 text-white text-btn-lg px-[16px] py-[12px] rounded-full flex items-center justify-center font-semibold hover:bg-primary-600 transition-colors duration-200 outline-none">
            Sign Up
          </button>
          
          <p className="text-[14px] text-neutral-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-500 font-bold hover:underline">
              Sign In
            </Link>
          </p>

        </div>

      </form>
    </>
  );
}
