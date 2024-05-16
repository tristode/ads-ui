import Editor from "./components/editor";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    handle: z.string().max(4, {
        message: "Handle must be at most 4 characters.",
    }),
    aboutMe: z.string(),
})

export default function CreateProfilePage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            handle: "",
            aboutMe: "",
        },
    });
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <div className="w-full p-8 flex flex-col items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 w-full flex flex-col border-4 rounded-md gap-4 p-4 bg-slate-200 dark:bg-slate-800">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="handle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Handle</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your @handle..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your @handle.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>)}
                    />

                    <FormField
                        control={form.control}
                        name="aboutMe"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> About me:</FormLabel>
                                <FormControl>
                                    <Editor onChange={() => null} value="" className="bg-slate-950 rounded-lg" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button variant="accent" type="submit">Create profile!</Button>
                </form>
            </Form>
        </div >
    )
}