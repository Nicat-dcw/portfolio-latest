import { db } from "../index";
import { up as createPageViews } from "./0000_create_page_views";
import { up as createApiKeys } from "./0001_create_api_keys";
import { up as createPosts } from "./0002_create_posts";
import { up as createVisitors } from "./0003_create_visitors";

async function main() {
  console.log("Running migrations...");
  await createPageViews(db);
  await createApiKeys(db);
  await createPosts(db);
  await createVisitors(db);
  console.log("Migrations complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
}); 