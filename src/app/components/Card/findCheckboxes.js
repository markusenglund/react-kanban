// Return the total number of checkboxes and the number of checked checkboxes
const findCheckboxesInText = text => {
  const checkboxes = text.match(/\[(\s|x)\]/g) || [];
  const checked = checkboxes.filter(checkbox => checkbox === "[x]").length;
  return { total: checkboxes.length, checked };
};

export default findCheckboxesInText;
