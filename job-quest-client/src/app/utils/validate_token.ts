import { jwtDecode } from "jwt-decode";

export function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp > currentTime;

  } catch (error) {
    return false;
  }
}