import { db } from "../index";
import { up } from "./0000_create_page_views";

async function main() {
  console.log("Running migrations...");
  await up(db);
  console.log("Migrations complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
}); 