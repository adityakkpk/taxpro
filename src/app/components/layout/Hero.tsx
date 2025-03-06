import Image from "next/image";
import React from "react";

const Hero = ({
  imageUrl = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  pageName = "AARTax",
  pageDesc = "",
}: {
  imageUrl: string;
  pageName?: string;
  pageDesc?: string;
}) => {
  return (
    <div className="relative h-[400px]">
      <Image
        src={imageUrl}
        alt="Tax professionals at work"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageName}</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">{pageDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
