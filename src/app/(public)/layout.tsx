import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SectionIndicator from "@/components/landing/SectionIndicator";
import CustomScrollbar from "@/components/landing/CustomScrollbar";
import PageReveal from "@/components/landing/PageReveal";
import { PAGE_CONTENT_ID } from "@/constants/landing-styles";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id={PAGE_CONTENT_ID} className="min-h-screen">
      <PageReveal />
      <Header />
      <SectionIndicator />
      <CustomScrollbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
