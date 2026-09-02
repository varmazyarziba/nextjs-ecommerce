import "../globals.css"
import { CartProvider } from "./context/CartContext";
import {AuthProvider} from "./context/AuthContext"
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideCart  from "./components/siderCard";
import { WishlistProvider } from "./context/WishlistContext";

export const metadata = {
  title: "فروشگاه قطعات الکترونیکی",
  description: "فروشگاه تخصصی قطعات الکترونیکی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-100 text-gray-900 text-right">
       <AuthProvider>
        <CartProvider> 
          <WishlistProvider>
          <Header />
           <SideCart />
          <main className="min-h-screen">{children}</main>
         <Footer /> 
          </WishlistProvider>
         </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


