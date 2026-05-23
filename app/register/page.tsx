"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LockIcon, AtSignIcon, User2Icon, Eye, EyeOff } from "lucide-react";

import SuperButton from "@/components/SuperButton";


export default function LoginPage() {
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
      <main className="flex flex-col gap-[32px] p-[32px] bg-linear-to-b from-white to-primary-100 h-dvh">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-h3 text-neutral-900 font-medium leading-tighter">Create Your Account</h1>
          <p className="text-body text-neutral-700">Start your learning journey with Fenyman AI ✨</p>
        </div>
        <div className="w-full flex flex-col items-center justify-between gap-2">
          <Image src="/images/mascot-auth.png" alt="mascot-auth" width={250} height={250}/>
          <form action="" method="post" className="w-full flex flex-col gap-4 items-center" onSubmit={ handleRegister }>
            <div className="w-full relative flex items-center bg-white border border-neutral-200 rounded-xl">
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <User2Icon className="w-7 h-7 stroke-neutral-400" />
              </div>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="flex-1 text-body text-neutral-700 placeholder-neutral-400 outline-none"
              />
            </div>
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
            <div className="w-full flex flex-col gap-4 items-center mt-[48px] cursor-pointer">
              <button type="submit" className="w-full bg-primary-500 text-white py-4 rounded-full text-body font-medium">Sign Up</button>
              <p className="text-body text-neutral-500">Already have an account? <Link href="/login" className="text-primary-500">Sign In</Link></p>
            </div>
          </form>
        </div>  
      </main>
    </>
  );
}
