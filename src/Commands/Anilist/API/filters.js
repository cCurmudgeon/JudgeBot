function capitalize(str) {
  const string = str
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(" ");
  return string;
}
function check(array) {
  if (array.length === 0) {
    return "No description";
  }
}
module.exports = { capitalize, check };
