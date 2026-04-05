export async function readLocalFile(file: File): Promise<string> {
  return await file.text();
}
