
import { FAQs } from "./components/FAQs";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { PricingPlanMultiple } from "./components/PricingPlanMultiple";
import { Hero } from "./components/Hero";
import { ToastNotification } from "./components/ToastNotification";
import { SearchParamsType } from "@/library/types";

export default function LandingPage({ searchParams }: { searchParams: SearchParamsType }) {

    return (
        <div id="home-page">
            <Hero />
            <Features />
            <PricingPlanMultiple />
            <FAQs />
            <Footer />
            {searchParams && <ToastNotification searchParams={searchParams} />}
        </div>
    );
}
