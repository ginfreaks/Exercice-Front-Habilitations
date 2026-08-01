import { ApiErrorBody } from "./api";

/**
 * Cette classe a pour but de typé les erreurs lors des appels API
 */
export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Fonction utilse pour centraliser les paramètres à passer lors des appels API, et pour éviter du code répététif
 * @param url
 * @param init
 * @returns
 */
export async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errBody = body as Partial<ApiErrorBody>;
    throw new ApiError(
      res.status,
      errBody.message ?? "Erreur réseau",
      errBody.errors,
    );
  }

  return (body as { data: T }).data;
}
