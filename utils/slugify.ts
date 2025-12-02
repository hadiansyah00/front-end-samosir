export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-dan-")
    .replace(/[\s\W-]+/g, "-") // replace spaces and non-word with -
    .replace(/^-+|-+$/g, "");
}
