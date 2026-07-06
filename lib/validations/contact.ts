import * as z from "zod";

export const contactSchema = z.object({
  nickname: z.string().min(2, { message: "Nickname must be at least 2 characters." }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  honeypot: z.string().max(0, { message: "Invalid submission" }).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
