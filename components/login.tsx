"use client";
import { useState, type ChangeEvent } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex w-full min-h-screen"
    >
      <div
        id="login"
        className="w-full md:w-1/2 min-h-screen p-6 sm:p-12 md:p-24 flex flex-col justify-center relative"
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 text-muted-foreground text-sm"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold mt-8 md:mt-0">Sign in</h1>
        <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        <div className="flex flex-col gap-4 py-6">
          <input
            className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          {loading ? "Logging in..." : "Continue"}
        </button>
        <p className="py-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            className="text-primary font-semibold hover:underline cursor-pointer"
            href="/sign-up"
          >
            Create an account
          </a>
        </p>
      </div>
      <div id="img" className="hidden md:block w-1/2 h-screen p-1">
        <div
          className="w-full h-full rounded-xl bg-cover bg-center relative"
          style={{
            backgroundImage: "url(/login2.webp)",
          }}
        >
          <div className="absolute bottom-4 right-4 text-white p-4 text-end">
            <h1 className="text-3xl">
              Live your life by a compass, <br /> not by a clock
            </h1>
            <h1 className="italic mt-2">- Stephen Covey</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
