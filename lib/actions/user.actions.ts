"use server";
// this file contains server actions for user authentication
// and user management. It includes functions for signing in, signing out, and signing up users.
import { signInSchema, signUpSchema } from "@/lib/validators";
import { signIn, signOut } from "@/lib/auth";
import { hashSync } from "bcrypt";
import { prisma } from "@/db/prisma";

// SignIn the user with Credentials (email and password)
export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log(user);
    
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

// SignUp the user with Credentials (email and password)
export const signUpWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    return { success: false, message: "Error signing up" };
  }
};
