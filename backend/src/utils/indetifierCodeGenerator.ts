export function generateIdentifierCode(firstName: string, lastName?: string): string {
  let firstInitial = "";
  let lastInitial = "";

  if (lastName) {
    firstInitial = firstName.trim().charAt(0);
    lastInitial = lastName.trim().charAt(0);
  } else {
    const parts = firstName.trim().split(/\s+/);
    firstInitial = parts[0]?.charAt(0) || "";
    lastInitial = parts.length > 1 ? parts[parts.length - 1].charAt(0) : parts[0]?.charAt(1) || "";
  }
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${firstInitial}${lastInitial}`.toUpperCase() + randomNumber;
}