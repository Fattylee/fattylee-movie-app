export const fetchData = async (url, setData, setIsLoading, setError) => {
  setIsLoading && setIsLoading(true);
  try {
    const res = await fetch(url);
    const json = await res.json();
    setData(json.results);
    setIsLoading && setIsLoading(false);
    return json;
  } catch (error) {
    setIsLoading && setIsLoading(false);
    // !error?.message?.includes("Failed to fetch") &&
    setError && setError(error.message);
    console.log(error, "error");
  }
};

export const slug = (id, title) =>
  `${id}-${title.replace(/\s+/g, "-").toLowerCase()}`;
