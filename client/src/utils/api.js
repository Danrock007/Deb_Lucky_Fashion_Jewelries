const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const accountVerificationRequests = new Map();

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

async function accountRequest(path, { method = "GET", body } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (method !== "GET" && method !== "HEAD") {
    const csrfResponse = await fetch(`${API_BASE}/accounts/csrf/`, {
      credentials: "include",
    });
    const csrfData = await parseJson(csrfResponse);
    if (!csrfResponse.ok || !csrfData?.csrf_token) {
      throw new Error("Unable to start a secure account session. Please try again.");
    }
    headers["X-CSRFToken"] = csrfData.csrf_token;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await parseJson(response);
  if (!response.ok) {
    const message =
      data?.detail ||
      Object.values(data || {}).flat().find((value) => typeof value === "string") ||
      "The account request could not be completed.";
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }
  return data;
}

export async function fetchCurrentAccount() {
  const response = await fetch(`${API_BASE}/accounts/me/`, {
    credentials: "include",
  });
  if (response.status === 401 || response.status === 403) return null;
  const data = await parseJson(response);
  if (!response.ok) throw new Error("Unable to load your account.");
  return data?.authenticated === false ? null : data;
}

export function registerAccount(payload) {
  return accountRequest("/accounts/register/", { method: "POST", body: payload });
}

export function loginAccount(payload) {
  return accountRequest("/accounts/login/", { method: "POST", body: payload });
}

export function verifyAccountEmail(token) {
  if (!accountVerificationRequests.has(token)) {
    const request = accountRequest("/accounts/verify-email/", {
      method: "POST",
      body: { token },
    }).finally(() => accountVerificationRequests.delete(token));
    accountVerificationRequests.set(token, request);
  }
  return accountVerificationRequests.get(token);
}

export function resendAccountVerification(email) {
  return accountRequest("/accounts/resend-verification/", {
    method: "POST",
    body: { email },
  });
}

export function updateAccountProfile(name) {
  return accountRequest("/accounts/me/", {
    method: "PATCH",
    body: { name },
  });
}

export function logoutAccount() {
  return accountRequest("/accounts/logout/", { method: "POST" });
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

export async function submitContactMessage(payload) {
  const response = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseJson(response);
  if (!response.ok) {
    const message =
      (data &&
        (data.detail ||
          data.email ||
          data.name ||
          data.message ||
          "Unable to send your message")) ||
      "Unable to send your message";
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message),
    );
  }

  return data;
}
