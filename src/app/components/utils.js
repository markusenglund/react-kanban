// Return the total number of checkboxes and the number of checked checkboxes inside a given text
export const findCheckboxes = text => {
  const checkboxes = text.match(/\[(\s|x)\]/g) || [];
  const checked = checkboxes.filter(checkbox => checkbox === "[x]").length;
  return { total: checkboxes.length, checked };
};

// Return colors with corresponding labels
export const colorsWithLabels = [
  ["inprogress", "#89609e"],
  ["general", "#00c2e0"],
  ["tracking", "#61bd4f"],
  ["bug", "#f2d600"],
  ["help", "#ff9f1a"],
  ["critical", "#eb5a46"]
];
