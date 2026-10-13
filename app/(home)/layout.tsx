import { Navbar } from "@/components/navbar"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      {children}
    </div>
  )
}
