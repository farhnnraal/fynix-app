"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, AtSign } from "lucide-react";
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
      
        <div className="w-full flex flex-col items-center pt-[190px]">
          
          <Image src="/images/mascot-auth.png" alt="Fenyman AI Mascot Welcoming" width={ 250 } height={ 250 } priority className="z-10 absolute top-[252px] object-contain" />

          <div className="w-full flex flex-col gap-3 bg-transparent">

            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="flex-2 text-body text-neutral-700 placeholder-neutral-400 outline-none"
              />
            </div>

            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
              </div> 
              <input
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="flex-2text-body text-neutral-700 placeholder-neutral-400 outline-none"
              />
            </div>

            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-neutral-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                min={8}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-2 text-body text-neutral-700 placeholder-neutral-400 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-[60px] h-[60px] flex items-center justify-center outline-nonez-10">
                {
                  showPassword ? <EyeOff className="w-7 h-7 stroke-neutral-400" /> : <Eye className="w-7 h-7 stroke-neutral-400" />
                }
              </button>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-4 mt-[32px]">
          <button type="submit" className="w-full bg-primary-500 text-white text-body p-[16px] rounded-full flex items-center justify-center font-medium">
            Sign Up
          </button>
          <p className="text-body text-neutral-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-500 font-medium">
              Sign In
            </Link>
          </p>
        </div>

      </form>
    </>
  );
}
