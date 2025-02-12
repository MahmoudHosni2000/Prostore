"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="space-y-4">
        <Image
          src={images[current]}
          alt="Product Image"
          width={1000}
          height={1000}
          className="
          rounded-md 
          min-h-[300px]
          object-cover
          object-center"
        />
        <div className="flex gap-1">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                "cursor-pointer",
                "w-20 h-20",
                "rounded-md",
                "overflow-hidden",
                "border-2",
                "border-gray-200",
                "hover:border-orange-600",
                index === current && "border-orange-500"
              )}
            >
              <Image
                src={image}
                alt="Product Image"
                width={100}
                height={100}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImages;
