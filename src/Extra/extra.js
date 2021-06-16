function capitalize(str) {
  const string = str
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(" ");
  return string;
}
module.exports = { capitalize };
