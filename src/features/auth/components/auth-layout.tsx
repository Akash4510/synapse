import React from "react";
import Image from "next/image";
import Link from "next/link";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center gap-6 p-2 sm:p-6 m:p-10">
      <Link
        href="/"
        className="flex items-center gap-2 self-center font-heading font-medium text-xl"
      >
        <Image
          src="/logos/logo.svg"
          alt="Synapse Logo"
          width={36}
          height={36}
        />
        Synapse
      </Link>

      {children}
    </div>
  );
};
