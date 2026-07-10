export const validateIssue = (
  title?: string,
  description?: string,
  type?: string
) => {
  if (!title?.trim()) {
    throw new Error("Title Required");
  }
   if (title.trim().length >150) {
    throw new Error("Title Too Long");
  }

  if (!description?.trim()) {
    throw new Error("Description Required");
  }

  if (description.trim().length < 20) {
    throw new Error("Description Too Short");
  }

  if (!type) {
    throw new Error("Type Required");
  }

  if (!["bug", "feature_request"].includes(type)) {
    throw new Error("Invalid Issue Type");
  }
};
