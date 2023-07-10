import "./globals.css";

export const metadata = {
  title: "Places",
  description: "Locate Places using Google Places API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
