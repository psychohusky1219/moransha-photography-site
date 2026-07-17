import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-02-19"}).withConfig({perspective: "raw"});
const seedPath = resolve(process.cwd(), "seed", "initial-content.ndjson");
const page = readFileSync(seedPath, "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .find(({_id}) => _id === "pricingPage");

if (!page) throw new Error("The pricingPage record is missing from initial-content.ndjson.");

const run = async () => {
  const existing = await client.getDocument(page._id);
  if (existing) {
    console.log("The Price page already exists in Sanity.");
    return;
  }

  await client.create(page, {autoGenerateArrayKeys: true});
  console.log("Created the editable Price page in Sanity.");
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
