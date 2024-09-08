import crypto from "node:crypto";
import bcrypt from "bcrypt";

const algorithm = "aes-256-cbc";

// welp, of course in real life I must be stored in a secure way
const key = "601bba4f1e876bd86cc53e755f3419f3629c3f9bec6c5c7b7563583886a4dc6f";

const buffer = Buffer.from(key, "hex");

const saltRounds = 10; // Tämä määrittää, kuinka monta kierrosta suolausta suoritetaan

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, buffer, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + "||" + encrypted;
}

export function decrypt(encryptedText: string): string {
  const [iv, encrypted] = encryptedText.split("||") as [string, string];

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
