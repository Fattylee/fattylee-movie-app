export const fetchData = async (url, setData) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    setData(json.results);
    return json;
    // TOOD: clear loader
  } catch (error) {
    // TOOD: clear loader
    console.log(error, "error");
  }
};

export const slug = (id, title) =>
  `${id}-${title.replace(/\s+/g, "-").toLowerCase()}`;
