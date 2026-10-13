import Image from "next/image"

import { BrandList } from "@/components/brand-list"
import { LogoLink } from "@/components/logo"
import authenticationImage from "@/public/assets/authentication-image.png"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)]">
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <LogoLink className="self-start" />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
      </div>
      <div className="sticky top-0 hidden h-svh p-6 lg:block xl:p-8">
        <div className="relative size-full overflow-hidden rounded-[2rem] bg-muted">
          <Image
            src={authenticationImage}
            alt="White sports car driving on a highway"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 55vw, 0px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/60 to-transparent" />
          <div className="relative flex max-w-2xl flex-col gap-8 px-10 pt-16 xl:px-12 xl:pt-20">
            <p className="font-heading text-3xl font-medium text-balance text-white xl:text-4xl">
              Sign in and Continue Your Journey Hassle-Free
            </p>
            <BrandList className="w-full justify-between" />
          </div>
        </div>
      </div>
    </div>
  )
}
