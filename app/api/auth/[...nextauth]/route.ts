import { handlers } from "@/lib/auth";

// destructure the handlers object to get the GET and POST methods
// handlers is an object that contains methods for handling authentication requests
export const { GET, POST } = handlers;