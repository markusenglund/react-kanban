import marked from "marked";

// Create HTML string from user generated markdown.
// There is some serious hacks going on here with regards to checkboxes.
// Checkboxes are not a feature of marked so are added manually with an id that
// corresponds to its index in the order of all checkboxes on the card.
// The id attribute is then used in the clickhandler of the card to identify which checkbox is clicked.
const formatMarkdown = markdown => {
  let i = 0;
  return marked(markdown, { sanitize: true, gfm: true, breaks: true })
    .replace(/<a/g, '<a target="_blank"')
    .replace(/\[(\s|x)\]/g, match => {
      let newString;
      if (match === "[ ]") {
        newString = `<input id=${i} onclick="return false" type="checkbox">`;
      } else {
        newString = `<input id=${i} checked onclick="return false" type="checkbox">`;
      }
      i += 1;
      return newString;
    });
};

export default formatMarkdown;
