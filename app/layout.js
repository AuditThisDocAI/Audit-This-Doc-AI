export const metadata = {
  title: "Audit This Doc AI",
  description: "AI Document Auditor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
