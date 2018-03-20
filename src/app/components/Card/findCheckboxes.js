const findCheckboxesInTitle = title => {
  const checkboxes = title.match(/\[(\s|x)\]/g) || [];
  const checked = checkboxes.filter(checkbox => checkbox === "[x]").length;
  return { total: checkboxes.length, checked };
};

export default findCheckboxesInTitle;
