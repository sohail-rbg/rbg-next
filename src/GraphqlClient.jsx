"use client";

const endpoint = "/api/hygraph";
const responseCache = new Map();

const Hygraph = {
  async request(query, variables = {}) {
    const queryText = typeof query === "string" ? query : String(query);
    const cacheKey = JSON.stringify({ query: queryText, variables });

    if (responseCache.has(cacheKey)) {
      return responseCache.get(cacheKey);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryText,
        variables,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      const message =
        result.errors?.map((error) => error.message).join(", ") ||
        result.error ||
        "Hygraph request failed.";
      throw new Error(message);
    }

    responseCache.set(cacheKey, result.data);
    return result.data;
  },
};

export default Hygraph;
