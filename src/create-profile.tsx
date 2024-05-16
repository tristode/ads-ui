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
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    nickname: z.string().max(4, {
        message: "Handle must be at most 4 characters.",
    }),
    aboutMe: z.string(),
})

export default function CreateProfilePage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            nickname: "",
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
                                    <Input placeholder=" Input your name..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your private display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder=" Input your username..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
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