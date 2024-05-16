import { MdOutlineClose } from "react-icons/md";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { uploadImage } from "@/lib/database";

export default function ImageUploader({
    images,
    setImages,
}: {
    setImages: (_: string[]) => void;
    images: string[] | undefined;
}) {
    const [postImage, setPostImage] = useState({
        imgFile: "",
    });

    const convertToBase64 = (file: File) =>
        new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if (!file) {
            console.error("No file found");
            return;
        }

        const base64 = await convertToBase64(file);
        if (typeof base64 !== "string") {
            console.error("Failed to convert image to base64");
            return;
        }

        setPostImage({ ...postImage, imgFile: base64 });
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
