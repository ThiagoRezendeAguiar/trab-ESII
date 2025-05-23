import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT)|| 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET: process.env.JWT_SECRET || "default",
    STRIPE_SECRET: process.env.STRIPE_SECRET || ""
}