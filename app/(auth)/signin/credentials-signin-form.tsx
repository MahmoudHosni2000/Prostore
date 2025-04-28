import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CredentialsSignInForm = () => {
  return (
    <>
      <form>
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
            <Button type="submit" className="w-full" variant={"default"}>
              Sign In
            </Button>
          </div>
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
