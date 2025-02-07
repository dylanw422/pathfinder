"use client";
import { useState, type ChangeEvent } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

export function Signup() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (data.user) {
        await axios.post("/api/auth/create-user", {
          id: data.user.id,
          email,
          firstName,
          lastName,
        });
      }

      router.push("/");

      if (error) throw error;
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

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex w-full min-h-screen"
    >
      <div
        id="signup"
        className="w-full md:w-1/2 min-h-[100dvh] p-6 sm:p-12 md:p-24 flex flex-col justify-center relative"
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 text-muted-foreground text-sm"
        >
          Back
        </button>
        <h1 className="text-2xl font-semibold mt-8 md:mt-0">
          Create an account
        </h1>
        <p className="mt-2 text-muted-foreground">Sign up for a new account</p>
        <div className="flex flex-col gap-4 py-6">
          <input
            className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              placeholder="First name"
              required
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <input
            className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>
        <p className="py-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            className="text-primary font-semibold hover:underline cursor-pointer"
            href="/login"
          >
            Log in
          </a>
        </p>
      </div>
      <div id="img" className="hidden md:block w-1/2 h-screen p-1">
        <div
          className="w-full h-full rounded-xl bg-cover bg-center relative"
          style={{
            backgroundImage: "url(/login.webp)",
          }}
        >
          <div className="absolute bottom-4 right-4 text-white p-4 text-end">
            <h1 className="text-3xl">
              Wherever you go, <br /> go with all your heart
            </h1>
            <h1 className="italic mt-2">- Confucius</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
