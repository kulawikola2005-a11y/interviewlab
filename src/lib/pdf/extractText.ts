import "server-only";

import { extractText } from "unpdf";

export async function extractTextFromPdf(
  file: File
): Promise<string> {
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are supported.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("PDF file cannot be larger than 5 MB.");
  }

  const arrayBuffer = await file.arrayBuffer();

  const result = await extractText(
    new Uint8Array(arrayBuffer)
  );

  const text = result.text
    .join("\n")
    .trim();

  if (!text) {
    throw new Error(
      "No readable text was found in this PDF."
    );
  }

  return text;
}
