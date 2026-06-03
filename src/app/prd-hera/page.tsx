import path from "path";
import DeepSpaceViewer from "@/components/DeepSpaceViewer";
import { loadHtmlWithIncludes } from "@/lib/utils";

export default async function PrdHeraPage() {
  const filePath = path.join(process.cwd(), "_legacy_html", "prd-hera.html");
  let content = loadHtmlWithIncludes(filePath);

  // Extract body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }
  
  // Fix navigation links
  content = content.replace(/href="index\.html"/g, 'href="/"');

  return <DeepSpaceViewer htmlContent={content} docTitle="HERA - Product Requirements Document" />;
}

