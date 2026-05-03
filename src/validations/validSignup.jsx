import z from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    
    lastName: z.string().min(1, { message: "Last name is required" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, { message: "Password must be less than 21 characters" })
        .regex(/[a-z]/, { message: "Password must have at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must have at least one uppercase letter" }),

    confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),

    address: z.string().min(1, { message: "Address is required" }),

    phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});