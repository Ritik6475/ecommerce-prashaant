'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function GenderSelect() {
  const genders = [
    {
      label: "Men",
      img: "https://w7.pngwing.com/pngs/929/40/png-transparent-male-fashion-model-clothing-man-brad-pitt-celebrities-fashion-shoe-thumbnail.png",
      href: "/men"
    },
    {
      label: "Women",
      img: "https://e7.pngegg.com/pngimages/290/822/png-clipart-fashion-illustration-drawing-illustration-fashion-girl-woman-wearing-red-dress-watercolor-painting-child-thumbnail.png",
      href: "/women"
    }
  ];

  return (
    <div className="w-full bg-white py-2 px-16 md:hidden">

      <div className="grid grid-cols-2 gap-1">

        {genders.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 relative rounded-full bg-neutral-100 p-1 border border-neutral-200 overflow-hidden">
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-contain"
              />
            </div>

            <p className="text-[10px] mt-[2px] font-medium text-neutral-700">
              {item.label}
            </p>
          </Link>
        ))}

      </div>
    </div>
  );
}
