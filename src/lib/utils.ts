import fs from "fs";
import path from "path";

/**
 * Loads an HTML file from the _legacy_html directory and dynamically resolves
 * any <!-- INCLUDE_FILE: relative/path/to/file.html --> comments by replacing them
 * with the target file's content. Works recursively.
 */
export function loadHtmlWithIncludes(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return `<!-- Error: File not found: ${path.basename(filePath)} -->`;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Regex to match <!-- INCLUDE_FILE: path -->
  const includeRegex = /<!--\s*INCLUDE_FILE:\s*([^\s-->]+)\s*-->/g;

  content = content.replace(includeRegex, (match, relPath) => {
    const fullPath = path.join(process.cwd(), "_legacy_html", relPath);
    return loadHtmlWithIncludes(fullPath);
  });

  return content;
}
