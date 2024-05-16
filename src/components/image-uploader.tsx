import { MdOutlineClose } from "react-icons/md";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { uploadImage } from "@/lib/database";
import { useAuthSession } from "@/lib/auth";

export default function ImageUploader({
    images,
    setImages,
}: {
    setImages: (_: string[]) => void;
    images: string[] | undefined;
}) {
    const session = useAuthSession();

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if (!file) {
            console.error("No file found");
            return;
        }

        const url = await uploadImage(file, session?.user?.id ?? "");
        if (!url) {
            console.error("Failed to upload image");
            return;
        }

        console.log("Uploaded image: ", url);

        const path = `https://ltabpziqzfhhohokzdfm.supabase.co/storage/v1/object/public/PostImages/${url.path}`;

        const newImages = [...(images ?? []), path];

        setImages(newImages);

        console.log("Images now: ", images);
    };

    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {images &&
                images.map((image, index) => (
                    <div key={image} className="relative">
                        <Button
                            onClick={() =>
                                setImages(images.filter((_, i) => i !== index))
                            }
                            variant="round"
                            size="xs"
                            className="absolute right-0 top-0"
                        >
                            <MdOutlineClose className="text-lg" />
                        </Button>
                        <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="h-20 w-20 rounded-lg object-cover"
                        />
                    </div>
                ))}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                id="file-upload"
                hidden
            />
            <Button
                variant="round"
                size="xs"
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                Add Image
            </Button>
        </div>
    );
}
