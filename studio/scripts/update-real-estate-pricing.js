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

const fields = {
  packagesIntro: page.packagesIntro,
  packages: page.packages,
  detailsEyebrow: page.detailsEyebrow,
  detailsTitle: page.detailsTitle,
  details: page.details,
  noteTitle: page.noteTitle,
  noteText: page.noteText
};

const run = async () => {
  for (const documentId of ["pricingPage", "drafts.pricingPage"]) {
    if (await client.getDocument(documentId)) {
      await client.patch(documentId).set(fields).commit({autoGenerateArrayKeys: true});
      console.log(`Updated ${documentId}.`);
    }
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
