import Link from "next/link"

import { Button } from "@/components/ui/button"
import { LogoLink } from "@/components/logo"

export function Navbar() {
  return (
    <header className="bg-background">
      <nav className="flex h-16 items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <LogoLink />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/sign-in" />}
          >
            Sign In
          </Button>
          <Button
            variant="brand"
            size="lg"
            nativeButton={false}
            render={<Link href="/sign-up" />}
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  )
}
