"use client";
// import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
// import { useRouter } from "next/navigation";

export function AppbarClient() {
  // const session = useSession();
  // const router = useRouter();

  return (
    <div>
      <Appbar
        onSignin={"SDf"}
        onSignout={async () => {
          // await signOut()
          // router.push("/api/auth/signin")
          console.log("signout");
        }}
        user={null}
      />
    </div>
  );
}
