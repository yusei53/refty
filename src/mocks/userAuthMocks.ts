import type { JWT } from "next-auth/jwt";

export const mockTestUserJwt = {
  async decode(): Promise<JWT | null> {
    return {
      name: "リフティ",
      email: "reftyapp@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJs17E4DFv6dE7fpbJMW8R5ERFBAQIm1-cz4N8XHHk4kOirrJw=s96-c",
      id: "b479ea17-7448-4b6e-9664-0a9588b8ddcc",
      username: "test"
    };
  }
};
