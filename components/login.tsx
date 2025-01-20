"use client";
import { useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      router.push("/");

      if (error) throw error;
    } catch (error: any) {
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
      className="flex w-full h-screen"
    >
      <div
        id="signup"
        className="w-1/2 h-screen xl:p-48 p-24 flex flex-col justify-center "
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 text-muted-foreground text-sm"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p>Sign in to your account</p>
        <div className="flex flex-col gap-2 py-4">
          <input
            className="border w-full p-2 focus:outline-none"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="border w-full p-2 focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-primary text-white p-2"
        >
          {loading ? "Logging in..." : "Continue"}
        </button>
        <p className="py-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            className="text-primary font-semibold hover:cursor-pointer"
            href="/sign-up"
          >
            Create an account
          </a>
        </p>
      </div>
      <div id="img" className="w-1/2 h-screen p-1">
        <div
          className="w-full h-full rounded-xl"
          style={{
            backgroundImage: "url(/login2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-4 right-4 text-white p-4 text-end">
            <h1 className="text-3xl">
              Live your life by a compass, <br /> not by a clock
            </h1>
            <h1 className="italic">- Stephen Covey</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
