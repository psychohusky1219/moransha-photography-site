const placesApiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;
const fieldMask = "rating,userRatingCount,reviews,googleMapsLinks.writeAReviewUri,googleMapsLinks.reviewsUri";

function fallbackLinks() {
  if (!placeId) return {writeReviewUrl: null, reviewsUrl: null};
  return {
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
    reviewsUrl: `https://www.google.com/maps/place/?q=place_id:${placeId}`
  };
}

module.exports = async function googleReviews(request, response) {
  if (request.method && request.method !== "GET") {
    response.writeHead(405, {"content-type": "application/json; charset=utf-8"});
    response.end(JSON.stringify({error: "Method not allowed"}));
    return;
  }

  if (!placesApiKey || !placeId) {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=600"
    });
    response.end(JSON.stringify({available: false, ...fallbackLinks()}));
    return;
  }

  const endpoint = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const placesResponse = await fetch(endpoint, {
      headers: {
        "X-Goog-Api-Key": placesApiKey,
        "X-Goog-FieldMask": fieldMask
      }
    });

    if (!placesResponse.ok) throw new Error(`Places API returned ${placesResponse.status}`);
    const data = await placesResponse.json();

    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map((review) => ({
          author: (review.authorAttribution && review.authorAttribution.displayName) || "Google user",
          photoUrl: (review.authorAttribution && review.authorAttribution.photoUri) || null,
          rating: review.rating || null,
          text: (review.text && review.text.text) || "",
          relativeTime: review.relativePublishTimeDescription || ""
        }))
      : [];

    const fallback = fallbackLinks();

    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, s-maxage=21600, stale-while-revalidate=3600"
    });
    response.end(
      JSON.stringify({
        available: true,
        rating: data.rating || null,
        reviewCount: data.userRatingCount || null,
        writeReviewUrl: (data.googleMapsLinks && data.googleMapsLinks.writeAReviewUri) || fallback.writeReviewUrl,
        reviewsUrl: (data.googleMapsLinks && data.googleMapsLinks.reviewsUri) || fallback.reviewsUrl,
        reviews
      })
    );
  } catch (error) {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300"
    });
    response.end(JSON.stringify({available: false, ...fallbackLinks()}));
  }
};
