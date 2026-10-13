import Image from "next/image"

import { cn } from "@/lib/utils"

const brands = [
  { name: "Honda", src: "/assets/honda.svg", width: 34, height: 29 },
  { name: "Toyota", src: "/assets/toyota.svg", width: 34, height: 28 },
  { name: "Mercedes", src: "/assets/benz.svg", width: 32, height: 32 },
  { name: "Ford", src: "/assets/ford.svg", width: 40, height: 15 },
  { name: "Tesla", src: "/assets/tesla.svg", width: 33, height: 34 },
  { name: "BMW", src: "/assets/bmw.svg", width: 35, height: 28 },
  { name: "Nissan", src: "/assets/nissan.svg", width: 34, height: 29 },
  { name: "Jeep", src: "/assets/jeep.svg", width: 30, height: 30 },
]

export function BrandList({ className }: { className?: string }) {
  return (
    <ul
      aria-label="Popular car brands"
      className={cn(
        "inline-flex flex-nowrap items-center gap-3 md:gap-6",
        className
      )}
    >
      {brands.map((brand) => (
        <li key={brand.name} className="flex">
          <Image
            src={brand.src}
            alt={brand.name}
            width={brand.width}
            height={brand.height}
            className="h-5 w-auto md:h-7"
          />
        </li>
      ))}
    </ul>
  )
}
