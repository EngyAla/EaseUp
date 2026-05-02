import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, { message: "This Field is required" }),

    email: z.string().email(),

    currentPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, { message: "Password must be less than 21 characters" })
        .regex(/[a-z]/, { message: "Password must have at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must have at least one uppercase letter" }),

    confirmPassword: z
        .string()
        .optional(),
})
.refine((data) => {
    // لو فيه confirmPassword → لازم يساوي currentPassword
    if (data.confirmPassword && data.confirmPassword.length > 0) {
        return data.currentPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});