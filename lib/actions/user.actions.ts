"use server";

import { signInSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";

// SignIn the user with Credentials (email and password)
export const signInUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch {
    return { success: false, message: "Invalid email or password" };
  }
};

// SignOut the user
export const signOutUser = async () => {
  await signOut();
};
