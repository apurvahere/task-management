import type { Handler } from "@netlify/functions";

const API_TOKEN = process.env.VITE_API_TOKEN;
const allowedEmails = (process.env.VITE_ALLOWED_EMAILS || "")
  .split(",")
  .map((e) => e.trim());
const allowedPasswords = (process.env.VITE_ALLOWED_PASSWORDS || "")
  .split(",")
  .map((p) => p.trim());

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, password } = JSON.parse(event.body || "{}");

    const validEmail = allowedEmails.includes(email);
    const validPassword = allowedPasswords.includes(password);

    if (validEmail && validPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          token: API_TOKEN,
          user: {
            id: 1,
            name: "John Cena",
            email,
          },
        }),
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  } catch (err: unknown) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};
