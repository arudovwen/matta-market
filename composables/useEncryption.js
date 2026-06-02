// composables/useEncryption.js
import CryptoJS from "crypto-js";

export const useEncryption = () => {
  const tryParseJson = (value) => {
    if (typeof value !== "string") return value;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const encrypt = (data) => {
    const config = useRuntimeConfig();
    const secretKey = config.public.encryptionKey;

    try {
      const value =
        typeof data === "object" ? JSON.stringify(data) : String(data);

      if (!secretKey) {
        return value;
      }

      const encrypted = CryptoJS.AES.encrypt(value, secretKey).toString();
      return encrypted;
    } catch (error) {
      return typeof data === "string" ? data : JSON.stringify(data);
    }
  };

  const decrypt = (encryptedData) => {
    if (encryptedData === null || encryptedData === undefined) {
      return encryptedData;
    }

    if (typeof encryptedData !== "string") {
      return encryptedData;
    }

    try {
      const config = useRuntimeConfig();
      const secretKey = config.public.encryptionKey;

      const rawValue = encryptedData.startsWith("ENC:")
        ? encryptedData.slice(4)
        : encryptedData;

      if (!secretKey) {
        return tryParseJson(rawValue);
      }

      const bytes = CryptoJS.AES.decrypt(rawValue, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        return tryParseJson(rawValue);
      }

      return tryParseJson(decrypted);
    } catch {
      return tryParseJson(encryptedData);
    }
  };

  return {
    encrypt,
    decrypt,
  };
};
