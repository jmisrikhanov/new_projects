"use client";

import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="flex items-center p-10 gap-24 animate-fade-in max-md:flex-col">
      <section className="flex flex-col items-center">
        <Image src="/assets/logo.svg" alt="Logo" width={300} height={300} />
        <h1 className="text-2xl font-black lg:text-3xl">
          {" "}
          Lorem ipsum dolor sit.
        </h1>
        <p className="font-extralight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          incidunt.
        </p>
        <Image
          src="/assets/planning.svg"
          alt="planning"
          width={300}
          height={300}
        />
      </section>
      <div className="mt-3">
        <SignIn
          routing="hash" // Keeps sign-in UI on the same page using hash-based routing
          appearance={{
            baseTheme: neobrutalism,
          }}
        />
      </div>
    </main>
  );
}
