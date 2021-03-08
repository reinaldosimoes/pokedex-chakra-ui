const getEnglishDescription = (entriesArray) => {
  if (!entriesArray) {
    return "";
  }

  const englishEntries = entriesArray.filter(
    (entry) => entry.language.name === "en"
  );

  const randomIndex = Math.floor(Math.random() * (englishEntries.length - 0));

  return englishEntries[randomIndex].flavor_text;
};

export default getEnglishDescription;
