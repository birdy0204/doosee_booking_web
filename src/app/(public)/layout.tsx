import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SectionIndicator from "@/components/landing/SectionIndicator";
import CustomScrollbar from "@/components/landing/CustomScrollbar";
import PageReveal from "@/components/landing/PageReveal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="page-content" className="min-h-screen">
      <PageReveal />
      <Header />
      <SectionIndicator />
      <CustomScrollbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
