"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LockIcon, AtSignIcon, Eye, EyeOff } from "lucide-react";

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
      <main className="flex flex-col gap-[32px] p-[32px] bg-linear-to-b from-white to-primary-300 h-dvh">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-h3 text-neutral-900 font-medium leading-tighter">Welcome Back Again!</h1>
          <p className="text-body text-neutral-700">Sign in and start learning with Fenyman AI ✨</p>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <Image src="/images/mascot-auth.png" alt="mascot-auth" width={250} height={250}/>
          <form action="" method="post" className="w-full justify-between flex flex-col gap-4 items-center" onSubmit={ handleLogin }>
            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <AtSignIcon className="w-7 h-7 stroke-neutral-400" />
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
            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <LockIcon className="w-7 h-7 stroke-neutral-400" />
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
            <div className="w-full flex flex-col gap-4 items-center mt-[48px]">
              <button type="submit" className="w-full bg-primary-500 text-white py-4 rounded-full text-body font-medium">Sign In</button>
              <p className="text-body text-neutral-500">Don't have an account? <Link href="/register" className="text-primary-500">Sign Up</Link></p>
            </div>
          </form>
        </div>  
      </main>
    </>
  );
}
