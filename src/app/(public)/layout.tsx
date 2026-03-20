import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SectionIndicator from "@/components/landing/SectionIndicator";
import CustomScrollbar from "@/components/landing/CustomScrollbar";
import PageReveal from "@/components/landing/PageReveal";
import LandscapeOverlay from "@/components/landing/LandscapeOverlay";
import DisablePinchZoom from "@/components/landing/DisablePinchZoom";
import { FramePreloadProvider } from "@/contexts/FramePreloadContext";
import { PAGE_CONTENT_ID } from "@/constants/landing-styles";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FramePreloadProvider>
      <div id={PAGE_CONTENT_ID} className="min-h-screen">
        <DisablePinchZoom />
        <LandscapeOverlay />
        <PageReveal />
        <Header />
        <SectionIndicator />
        <CustomScrollbar />
        <main>{children}</main>
        <Footer />
      </div>
    </FramePreloadProvider>
  );
}
