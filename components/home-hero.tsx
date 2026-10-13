"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { BrandList } from "@/components/brand-list"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { SearchCarForm } from "@/components/search-car-form"
import headerImage from "@/public/assets/home-header-image.png"

const slides = [
  {
    title: "Quick & easy car rentals, book and go!",
    description:
      "Great cars at great prices, from the biggest car rental companies",
  },
  {
    title: "Pick up anywhere, drop off anytime",
    description:
      "Thousands of locations so your car is always close to where you are",
  },
  {
    title: "No hidden fees, no surprises",
    description: "Transparent pricing and free cancellation on most bookings",
  },
]

const AUTOPLAY_DELAY = 6000

export function HomeHero() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const timer = reduceMotion
      ? undefined
      : setInterval(() => api.scrollNext(), AUTOPLAY_DELAY)
    const stop = () => clearInterval(timer)
    api.on("pointerDown", stop)

    return () => {
      stop()
      api.off("select", onSelect)
      api.off("pointerDown", stop)
    }
  }, [api])

  const slide = slides[current]

  return (
    <div className="relative flex flex-col gap-6">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="overflow-hidden rounded-3xl"
      >
        <CarouselContent className="ml-0">
          {slides.map((item, index) => (
            <CarouselItem
              key={item.title}
              aria-label={`${index + 1} of ${slides.length}`}
              className="relative aspect-10/9 pl-0 sm:aspect-2/1 lg:aspect-12/5"
            >
              <Image
                src={headerImage}
                alt=""
                fill
                preload={index === 0}
                placeholder="blur"
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pointer-events-none absolute inset-0 flex flex-col px-4 pb-4 md:px-[10%] md:pb-10">
          <div className="flex flex-1 flex-col items-center justify-end gap-6 md:items-start md:justify-center md:gap-10">
            <div
              key={current}
              className="flex max-w-md animate-in flex-col gap-2 text-center text-white duration-500 fade-in slide-in-from-bottom-2 md:gap-4 md:text-left lg:max-w-xl"
            >
              <h1 className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
                {slide.title}
              </h1>
              <p className="text-base text-pretty text-white/90 sm:text-lg md:text-2xl">
                {slide.description}
              </p>
            </div>

            <div className="pointer-events-auto flex w-full gap-4 md:w-auto md:gap-5">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === current}
                  onClick={() => api?.scrollTo(index)}
                  className="group flex-1 rounded-full py-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:flex-none"
                >
                  <span
                    className={cn(
                      "block h-1 w-full rounded-full transition-colors md:w-20",
                      index === current
                        ? "bg-brand"
                        : "bg-white group-hover:bg-white/80"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Carousel>

      <div className="flex flex-col gap-6 lg:absolute lg:inset-y-0 lg:right-[10%] lg:justify-center">
        <SearchCarForm />
        <BrandList className="w-full justify-between lg:w-sm [&_img]:opacity-25 [&_img]:brightness-0 lg:[&_img]:opacity-100 lg:[&_img]:brightness-100 dark:[&_img]:opacity-40 dark:[&_img]:invert lg:dark:[&_img]:invert-0" />
      </div>
    </div>
  )
}
