import { Outfit } from "next/font/google";
import "./globals.css";
// import { Footer, Header } from "@/components/common";
import RootProviders from "@/providers/RootProviders";

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-roboto",
// });
const outfit = Outfit({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "Real Time Chat",
  description: "A real time chat application built with Next.js and React",
};

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <RootProviders>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </RootProviders>
      </body>
    </html>
  );
}
