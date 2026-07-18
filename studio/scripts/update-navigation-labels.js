import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-02-19"}).withConfig({perspective: "raw"});
const labels = {
  navHomeLabel: "Home",
  navFoodLabel: "Food Photography",
  navRealEstateLabel: "Real Estate",
  navPricingLabel: "Prices",
  navAboutLabel: "About",
  navContactLabel: "Contact"
};

const run = async () => {
  for (const documentId of ["globalSettings", "drafts.globalSettings"]) {
    if (await client.getDocument(documentId)) {
      await client.patch(documentId).setIfMissing(labels).commit();
      console.log(`Added navigation labels to ${documentId}.`);
    }
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
