import path from "path";
import DeepSpaceViewer from "@/components/DeepSpaceViewer";
import { loadHtmlWithIncludes } from "@/lib/utils";

export default async function CreativeXPRDPage() {
  const filePath = path.join(process.cwd(), "_legacy_html", "creative-x", "creative_x_prd.html");
  let content = loadHtmlWithIncludes(filePath);

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }
  
  content = content.replace(/href="index\.html"/g, 'href="/creative-x"');

  return (
    <DeepSpaceViewer 
      htmlContent={content} 
      docTitle="CREATIVE-X - Product Requirements Document" 
      backUrl="/creative-x" 
      accentColor="#ec4899"
      accentColorRgb="236, 72, 153"
    />
  );
}


