import fs from "fs";
import path from "path";
import DocumentAlignmentViewer from "@/components/DocumentAlignmentViewer";

export default async function TalosSDDPage() {
  const filePath = path.join(process.cwd(), "_legacy_html", "talos-wms", "SDD.html");
  let content = fs.readFileSync(filePath, "utf-8");

  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }
  
  content = content.replace(/href="index\.html"/g, 'href="/talos-wms"');

  return <DocumentAlignmentViewer htmlContent={content} docTitle="TALOS - System Design Document" />;
}
