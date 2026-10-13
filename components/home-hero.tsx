import Image from "next/image"

import headerImage from "@/public/assets/home-header-image.png"

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-112 flex-col justify-center overflow-hidden rounded-3xl px-6 md:aspect-12/5 md:min-h-0 md:px-[10%]">
      <Image
        src={headerImage}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/60 via-black/30 to-transparent" />

      <div className="flex max-w-md flex-col gap-4 text-white lg:max-w-xl">
        <h1 className="text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
          Quick &amp; easy car rentals, book and go!
        </h1>
        <p className="text-lg text-pretty text-white/90 md:text-2xl">
          Great cars at great prices, from the biggest car rental companies
        </p>
      </div>
    </section>
  )
}
