import { MdOutlineClose } from "react-icons/md";
import { Button } from "./ui/button";

export default function ImageUploader({
    images,
    setImages,
}: {
    setImages: (_: string[]) => void;
    images: string[] | undefined;
}) {
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
        </div>
    );
}
