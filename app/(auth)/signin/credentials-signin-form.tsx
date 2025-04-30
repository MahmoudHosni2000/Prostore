"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react"; // use "useFormState" in version 18.0.0 and above instead of "useActionState"
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
  // useActionState is a custom hook that manages the state of an action
  // It takes a function and an initial state as arguments and returns the current state and a function to trigger the action
  const [data, action] = useActionState(signInWithCredentials, {
    success: true,
    message: "",
  });

  // catch url params
  // useSearchParams is a hook that returns the current URL search parameters
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        type="submit"
        className="w-full"
        variant={"default"}
        disabled={pending}
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <>
      <form action={action}>
        {/* This is a hidden input field that stores the callback URL */}
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <div>
            <Label>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              defaultValue={signInDefaultValues.email}
            ></Input>
          </div>
          <div>
            <Label>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              autoComplete="password"
              defaultValue={signInDefaultValues.password}
            ></Input>
          </div>
          <div>
            <SignInButton />
          </div>
          {data && !data.success && (
            <div className="text-sm text-red-500 text-center">
              {data.message}
            </div>
          )}
          <div className="text-sm text-center text-muted-foreground">
            <div className="link">
              Don&apos;t have an account?{" "}
              <Link target="_self" href="/signup" className="link">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CredentialsSignInForm;
