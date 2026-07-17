const projectId = "843m1n6c";
const dataset = "production";
const apiVersion = "2025-02-19";

const allowedPages = new Set([
  "homePage",
  "aboutPage",
  "foodPage",
  "realEstatePage",
  "pricingPage",
  "newYorkPage",
  "eventsPage",
  "contactPage",
  "faqPage",
  "privacyPage",
  "termsPage",
  "cancellationsPage",
  "termsConditionsPage"
]);

module.exports = async function sanityContent(request, response) {
  if (request.method && request.method !== "GET") {
    response.writeHead(405, {"content-type": "application/json; charset=utf-8"});
    response.end(JSON.stringify({error: "Method not allowed"}));
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const pageId = requestUrl.searchParams.get("page");

  if (!allowedPages.has(pageId)) {
    response.writeHead(400, {"content-type": "application/json; charset=utf-8"});
    response.end(JSON.stringify({error: "Unknown page"}));
    return;
  }

  const query = `*[_id in ["globalSettings", "${pageId}"]]{..., "heroImageUrl": heroImage.asset->url, "portraitImageUrl": portraitImage.asset->url, "featureImageUrl": featureImage.asset->url, "foodImageUrl": foodImage.asset->url, "realEstateImageUrl": realEstateImage.asset->url, "gallery": coalesce(gallery[]{_key, alt, "filename": asset->originalFilename, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}, [])}`;
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const sanityResponse = await fetch(endpoint, {headers: {Accept: "application/json"}});
    if (!sanityResponse.ok) throw new Error(`Sanity returned ${sanityResponse.status}`);
    const payload = await sanityResponse.json();
    const settings = payload.result.find(({_id}) => _id === "globalSettings") || null;
    const page = payload.result.find(({_id}) => _id === pageId) || null;

    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300"
    });
    response.end(JSON.stringify({settings, page}));
  } catch (error) {
    response.writeHead(502, {"content-type": "application/json; charset=utf-8"});
    response.end(JSON.stringify({error: "Content service unavailable"}));
  }
};
