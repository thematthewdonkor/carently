"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
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
            className="relative min-h-112 pl-0 md:aspect-12/5 md:min-h-0"
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

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-10 px-6 md:px-[10%]">
        <div
          key={current}
          className="flex max-w-md animate-in flex-col gap-4 text-white duration-500 fade-in slide-in-from-bottom-2 lg:max-w-xl"
        >
          <h1 className="text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            {slide.title}
          </h1>
          <p className="text-lg text-pretty text-white/90 md:text-2xl">
            {slide.description}
          </p>
        </div>

        <div className="pointer-events-auto flex gap-5">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              onClick={() => api?.scrollTo(index)}
              className="group rounded-full py-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span
                className={cn(
                  "block h-1 w-12 rounded-full transition-colors md:w-20",
                  index === current
                    ? "bg-brand"
                    : "bg-white group-hover:bg-white/80"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </Carousel>
  )
}
