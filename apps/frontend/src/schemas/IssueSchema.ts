import * as z from "zod";

export const issueSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  status: z.string().min(1, "Please select a status"),
  priority: z.string().min(1, "Please select a priority"),
  dueDate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (date) => {
        if (!date) return true;

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Due date must be today or in the future" },
    ),
});

export type IssueFormValues = z.infer<typeof issueSchema>;
