import Contact from "@/components/sections/contact";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 pt-24">
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
