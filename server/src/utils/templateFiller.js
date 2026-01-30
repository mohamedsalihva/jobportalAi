export const fillTemplate = (template, data) => {
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, data[key]);
  });
  return template;
};
