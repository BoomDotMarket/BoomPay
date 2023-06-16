export function isValidUUID(uuid: string): boolean {
  if (!uuid || typeof uuid !== "string") {
    return false;
  }
  let match = uuid.match(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
  );
  if (match === null) {
    return false;
  }
  return true;
}
