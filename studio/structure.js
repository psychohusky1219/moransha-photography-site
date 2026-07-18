const singleton = (S, title, schemaType, documentId) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));

export const singletonTypes = new Set([
  "globalSettings",
  "homePage",
  "aboutPage",
  "contactPage",
  "faqPage",
  "portfolioPage",
  "pricingPage",
  "standalonePage",
  "policyPage"
]);

export const structure = (S) =>
  S.list()
    .title("Website Content")
    .items([
      singleton(S, "Site Settings", "globalSettings", "globalSettings"),
      S.divider(),
      singleton(S, "Home", "homePage", "homePage"),
      singleton(S, "About", "aboutPage", "aboutPage"),
      singleton(S, "Food Photography", "portfolioPage", "foodPage"),
      singleton(S, "Real Estate", "portfolioPage", "realEstatePage"),
      singleton(S, "Prices", "pricingPage", "pricingPage"),
      singleton(S, "Contact", "contactPage", "contactPage"),
      singleton(S, "FAQ", "faqPage", "faqPage"),
      S.divider(),
      S.listItem()
        .title("Standalone Pages")
        .child(
          S.list()
            .title("Standalone Pages")
            .items([
              singleton(S, "New York", "standalonePage", "newYorkPage"),
              singleton(S, "Events", "standalonePage", "eventsPage")
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Policies")
        .child(
          S.list()
            .title("Policies")
            .items([
              singleton(S, "Terms and Conditions", "policyPage", "termsConditionsPage"),
              singleton(S, "Privacy", "policyPage", "privacyPage"),
              singleton(S, "Terms", "policyPage", "termsPage"),
              singleton(S, "Cancellations", "policyPage", "cancellationsPage")
            ])
        )
    ]);
