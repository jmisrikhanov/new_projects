import { drizzle } from "drizzle-orm/neon-http";
// Importing Drizzle's Neon HTTP driver for ORM support
import { neon } from "@neondatabase/serverless";
// Importing database schema definitions (e.g., tables) from the local schema file
import * as schema from "./schema";

// Initialize the Neon client using the DATABASE_URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

// Create and export Drizzle ORM instance, with the Neon client and schema for type-safe queries
export const db = drizzle(sql, { schema });
