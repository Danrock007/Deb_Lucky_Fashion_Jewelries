const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

function normalizeProduct(product) {
  return {
    id: Number(product.id),
    category: product.category_name || product.category || "General",
    name: product.name,
    description: product.description || "",
    price: Number(product.price ?? 0),
    image: product.image || "",
    badge: product.badge || "",
    stock_quantity: Number(product.stock_quantity ?? 0),
  };
}

async function parseJson(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }
  return response.json();
}

async function fetchAllPages(path) {
  const results = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(`${API_BASE}${path}?page=${page}`);
    if (!response.ok) throw new Error(`Unable to load ${path.includes("products") ? "products" : "categories"}`);
    const data = (await parseJson(response)) || {};
    const pageResults = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];
    results.push(...pageResults);

    if (Array.isArray(data)) {
      hasNextPage = false;
    } else if (data.next) {
      const nextPage = new URL(data.next, window.location.href).searchParams.get("page");
      const nextPageNumber = Number(nextPage);
      if (!Number.isInteger(nextPageNumber) || nextPageNumber <= page) {
        throw new Error("The catalog API returned an invalid pagination link.");
      }
      page = nextPageNumber;
    } else {
      hasNextPage = false;
    }
  }

  return results;
}

export async function fetchProducts() {
  const products = await fetchAllPages("/catalog/products/");
  return products.map(normalizeProduct);
}

export async function fetchCategories() {
  const categories = await fetchAllPages("/catalog/categories/");
  const names = categories.map((category) => category.name).filter(Boolean);
  return ["All", ...new Set(names)];
}

export async function prepareOrder(orderPayload) {
  const response = await fetch(`${API_BASE}/orders/prepare/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
  });

  const data = await parseJson(response);
  if (!response.ok) {
    const message = (data && (data.detail || data.items || "Unable to prepare order")) || "Unable to prepare order";
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }

  return data;
}

export async function verifyOrderPayment(reference) {
  const response = await fetch(`${API_BASE}/orders/verify-payment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference }),
  });

  const data = await parseJson(response);
  if (!response.ok) {
    const message = (data && (data.detail || data.reference || data.items || "Unable to verify payment")) || "Unable to verify payment";
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }

  return data;
}
