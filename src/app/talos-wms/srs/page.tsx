import fs from "fs";
import path from "path";
import LegacyHtmlViewer from "@/components/LegacyHtmlViewer";

export default async function TalosSRSPage() {
  const filePath = path.join(process.cwd(), "_legacy_html", "talos-wms", "SRS.html");
  let content = fs.readFileSync(filePath, "utf-8");

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }
  
  content = content.replace(/href="index\.html"/g, 'href="/talos-wms"');

  return <LegacyHtmlViewer htmlContent={content} />;
}
