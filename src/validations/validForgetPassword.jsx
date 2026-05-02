import z from "zod";

export const frogetPassSchema = z.object({
    email: z.string().min(1, {message: "This Field is required"}).email({message: "Email is not valid!"}),
});