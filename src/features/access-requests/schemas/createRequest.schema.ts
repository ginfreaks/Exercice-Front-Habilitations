import z from "zod";

export const createRequestSchema = z.object({
  requesterName: z
    .string()
    .trim()
    .min(2, "Le nom du demandeur doit contenir au moins 2 caractères"),
  applicationId: z.string().min(1, "L'application est requise."),
  roleId: z.string().min(1, "Le rôle est requis."),
  reason: z
    .string()
    .trim()
    .min(10, "La justification doit faire au moins 10 caractères"),
});

export type CreateRequestValues = z.infer<typeof createRequestSchema>;