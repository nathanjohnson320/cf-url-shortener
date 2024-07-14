import { nanoid } from "nanoid";

// https://medium.com/@snyksec/secure-javascript-url-validation-a74ef7b19ca8
export function checkHttpUrl(url: string) {
  let givenURL;
  try {
    givenURL = new URL(url);
  } catch (error) {
    return false;
  }
  return givenURL.protocol === "http:" || givenURL.protocol === "https:";
}

export function createShortUrl() {
  return nanoid(10);
}
