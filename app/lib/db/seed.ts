import { db } from "./index";
import { users } from "./schema";
import { hashPassword } from "../auth/password";
import { eq } from "drizzle-orm";
import { up as createUsers } from "./migrations/0004_create_users";

async function seedAdminUser() {
  try {
    // First, ensure the users table exists
    await createUsers(db);
    console.log('Users table created or verified');
    
    // Check if admin user already exists
    const adminEmail = 'admin@example.com';
    
    try {
      const existingAdmin = await db.select().from(users).where(eq(users.email, adminEmail)).get();
      
      if (existingAdmin) {
        console.log('Admin user already exists');
        return;
      }
    } catch (error) {
      // Table might exist but be empty, continue with seeding
    }

    // Create admin user
    const passwordHash = await hashPassword('adminpassword');
    await db.insert(users).values({
      email: adminEmail,
      username: 'Admin',
      passwordHash,
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=random',
    });

    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Failed to seed admin user:', error);
  }
}

// Run all migrations first
async function runMigrations() {
  try {
    const { up: createPageViews } = await import("./migrations/0000_create_page_views");
    const { up: createApiKeys } = await import("./migrations/0001_create_api_keys");
    const { up: createPosts } = await import("./migrations/0002_create_posts");
    const { up: createVisitors } = await import("./migrations/0003_create_visitors");
    const { up: createUsers } = await import("./migrations/0004_create_users");
    
    console.log("Running migrations...");
    await createPageViews(db);
    await createApiKeys(db);
    await createPosts(db);
    await createVisitors(db);
    await createUsers(db);
    console.log("Migrations complete!");
    
    // Now seed the admin user
    await seedAdminUser();
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run migrations and seed
runMigrations(); 