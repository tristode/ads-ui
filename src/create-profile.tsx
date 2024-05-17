import Editor from "./components/editor";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUser, uploadImage, userExists } from "./lib/database";
import { useAuthSession } from "./lib/auth";
import { ChangeEvent, useEffect, useState } from "react";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  handle: z.string().max(4, {
    message: "Handle must be at most 4 characters.",
  }),
  avatar: z.custom<File>((value) => {
    if (value instanceof File) return true;
    throw new Error("Avatar must be a file.");
  }),
  aboutMe: z.string(),
});

const blobUrlToFile = (blobUrl:string): Promise<File> => new Promise((resolve) => {
    fetch(blobUrl).then((res) => {
      res.blob().then((blob) => {
        // please change the file.extension with something more meaningful
        // or create a utility function to parse from URL
        const file = new File([blob], 'file.extension', {type: blob.type})
        resolve(file)
      })
    })
  })


export default function CreateProfilePage() {
  const session = useAuthSession(true);
  console.log(session);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      handle: "",
      avatar: new File([], ""),
      aboutMe: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("onSubmit");
    if (!session) return;
    const avatarUrl = await uploadImage(data.avatar, session.user.id);
    console.log(avatarUrl);
    if (!avatarUrl) {
      console.error("Failed to upload image");
      return;
    }

    const path = `https://ltabpziqzfhhohokzdfm.supabase.co/storage/v1/object/public/PostImages/${avatarUrl.path}`

    await createUser(
      session,
      data.handle,
      data.username,
      path,
      data.aboutMe
    );
    console.log("createdUser")
    navigate("/");
  };

  useEffect(() => {
    if (!session) return;
    blobUrlToFile(session.user.user_metadata?.avatar_url ?? "").then((file) => {
        form.setValue("avatar", file);
    });
    form.reset({
      username: session.user.user_metadata?.full_name ?? "",
      handle: session.user.email?.split("@")?.[0]?.split(".")?.[0] ?? "",
      avatar: new File([], ""),
      aboutMe: "",
    });
    userExists(session.user.id).then((exists) => {
      if (exists) {
        navigate("/");
      }

      setLoaded(true);
    });
  }, [session?.user.id]);

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
        console.error("No file found");
        return;
    }
    
    form.setValue("avatar", file);
  }

  return (
    loaded && (
      <div className="w-full p-8 flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-96 w-full flex flex-col border-4 rounded-md gap-4 p-4 bg-slate-200 dark:bg-slate-800"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name..." {...field} />
                  </FormControl>
                  <FormDescription>This is your display name.</FormDescription>
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
                  <FormDescription>This is your @handle.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      id="avatar"
                      hidden
                    />
                      <img
                        src={URL.createObjectURL(field.value)}
                        alt="avatar"
                        className="w-12 h-12 rounded-full"
                        />
                      <Button
                        variant="accent"
                        onClick={() => document.getElementById("avatar")?.click()}
                        >
                        Upload
                        </Button>
                      </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
              control={form.control}
              name="aboutMe"
              render={() => (
                <FormItem>
                  <FormLabel> About me:</FormLabel>
                  <FormControl>
                    <Editor
                      onChange={() => null}
                      value=""
                      className="bg-slate-950 rounded-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button variant="accent" type="submit">
              Create profile!
            </Button>
          </form>
        </Form>
      </div>
    )
  );
}
