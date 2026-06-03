import path from "path";
import DeepSpaceViewer from "@/components/DeepSpaceViewer";
import { loadHtmlWithIncludes } from "@/lib/utils";

export default async function TalosPRDPage() {
  const filePath = path.join(process.cwd(), "_legacy_html", "talos-wms", "PRD.html");
  let content = loadHtmlWithIncludes(filePath);

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }
  
  content = content.replace(/href="index\.html"/g, 'href="/talos-wms"');

  return (
    <DeepSpaceViewer 
      htmlContent={content} 
      docTitle="TALOS - Product Requirements Document" 
      backUrl="/talos-wms" 
      accentColor="#6366f1"
      accentColorRgb="99, 102, 241"
    />
  );
}

