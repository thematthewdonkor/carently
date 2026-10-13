import type { SignIn } from "@clerk/nextjs"

// Blends Clerk's auth card into its column and styles it to the auth design
export const authAppearance = {
  variables: {
    colorPrimary: "var(--brand)",
    colorPrimaryForeground: "var(--brand-foreground)",
    colorInput: "var(--muted)",
    borderRadius: "0.5rem",
  },
  elements: {
    rootBox: { width: "100%", display: "flex", justifyContent: "center" },
    cardBox: {
      width: "100%",
      maxWidth: "22rem",
      border: "none",
      borderRadius: 0,
      boxShadow: "none",
    },
    card: {
      padding: 0,
      gap: "1.5rem",
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
    },
    header: { gap: "0.5rem" },
    headerTitle: { fontSize: "1.25rem", fontWeight: 500 },
    headerSubtitle: { fontSize: "0.875rem", color: "var(--muted-foreground)" },
    socialButtons: { gap: "0.5rem" },
    socialButtonsBlockButton: {
      height: "2.5rem",
      border: "1px solid var(--border)",
      boxShadow: "none",
      backgroundColor: "var(--background)",
    },
    socialButtonsBlockButtonText: { fontSize: "0.875rem", fontWeight: 500 },
    dividerText: {
      fontSize: "0.625rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    formFieldLabel: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "var(--muted-foreground)",
    },
    formFieldInput: {
      height: "2.5rem",
      paddingInline: "0.75rem",
      fontSize: "0.875rem",
      border: "1px solid var(--border)",
      boxShadow: "none",
    },
    formFieldAction: { color: "var(--brand)", fontWeight: 500 },
    formButtonPrimary: {
      height: "2.5rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      boxShadow: "none",
      backgroundColor: "var(--brand)",
      color: "var(--brand-foreground)",
      "&:hover, &:focus": { backgroundColor: "var(--brand)", opacity: 0.9 },
    },
    footer: { background: "transparent" },
    footerAction: { fontSize: "0.875rem" },
    footerActionLink: { color: "var(--brand)", fontWeight: 500 },
  },
} satisfies React.ComponentProps<typeof SignIn>["appearance"]
