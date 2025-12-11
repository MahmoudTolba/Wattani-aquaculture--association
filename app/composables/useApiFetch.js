// composables/useApiFetch.js

// Common options configuration function

const createFetchOptions = (options = {}) => {
  const store = useUserStore();
  const { token } = storeToRefs(store);
  const config = useRuntimeConfig();
  const baseURL = options.baseURL || config.public.apiBase;
  const nuxtApp = useNuxtApp();
  const lang = nuxtApp.$i18n?.locale?.value || "ar";

  const headers = {
    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    lang: lang || "ar",
    "X-API-KEY": "5f43766dcd92b8c3e7639d2a8791063c",
    ...options.headers,
  };

  return {
    baseURL,
    headers,
    responseType: "json",
    ...options,
  };
};

// SEO-friendly version
export const useApiAsyncData = async (url, options = {}) => {
  const nuxtApp = useNuxtApp();
  const lang = nuxtApp.$i18n?.locale?.value || "ar";

  return await useAsyncData(
    `${url}-${lang}`,
    () =>
      $fetch(url, {
        ...createFetchOptions(options),
        method: "GET",
        params: options.params || {},
      }),
    {
      transform: (res) => {
        if (options.pick?.length && res?.data) {
          return options.pick.reduce((acc, key) => {
            acc[key] = res.data[key];
            return acc;
          }, {});
        }
        return res;
      },
    }
  );
};
// For data fetching with useFetch
export const useApiFetch = (url, options = {}) => {
  const nuxtApp = useNuxtApp();
  const lang = nuxtApp.$i18n?.locale?.value || "ar";
  return useFetch(url, {
    params: options.params || {}, // Set default params if none provided
    ...createFetchOptions(options),
    method: "GET",
    key: `${url}-${lang}`,
    transform: (res) => {
      // If you pass a pick array, reduce the object
      if (options.pick?.length && res?.data) {
        return options.pick.reduce((acc, key) => {
          acc[key] = res.data[key];
          return acc;
        }, {});
      }
      return res;
    },
  });
};

// Unified fetch function
const fetchData = async (url, options = {}, method) => {
  const nuxtApp = useNuxtApp();
  const lang = nuxtApp.$i18n?.locale?.value || "ar";
  try {
    const response = await $fetch(url, {
      ...createFetchOptions(options),
      method,
      body: options.body || undefined, // Ensure body is included if it exists
      key: `${url}-${lang}`,
    });

    // Directly return the response
    return { data: response, error: null };
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return { data: null, error };
  }
};

// For data fetching with $fetch
export const fetchApiData = (url, options = {}) => {
  return fetchData(url, options, "GET"); // Call the unified fetch with GET method
};

// For form submission or other requests with $fetch
export const submitApiForm = (url, formData, method = "POST", options = {}) => {
  // If formData is FormData, don't set Content-Type header
  const fetchOptions = { ...options, body: formData };
  if (formData instanceof FormData) {
    fetchOptions.contentType = "multipart/form-data";
  }
  return fetchData(url, fetchOptions, method);
};
