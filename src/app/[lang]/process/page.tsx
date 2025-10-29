import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PencilRuler, WholeWord, Beaker, PackageCheck, Truck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const processSteps = [
  {
    icon: PencilRuler,
    title: '1. Design & Consultation',
    description: 'We collaborate with you to finalize your design, ensuring every detail is perfect before production begins. Our experts provide feedback to optimize for manufacturing.',
  },
  {
    icon: WholeWord,
    title: '2. Mold Creation',
    description: 'Our engineers use precision CNC machines to create a high-fidelity steel mold based on your approved design. This is the blueprint for your product.',
  },
  {
    icon: Beaker,
    title: '3. Sample Production',
    description: 'A physical sample is produced for your approval, allowing for final checks on color, texture, and quality. We iterate until it\'s perfect.',
  },
  {
    icon: PackageCheck,
    title: '4. Mass Production',
    description: 'Upon approval, we commence full-scale production, maintaining strict quality control at every stage to ensure consistency across the entire batch.',
  },
  {
    icon: Truck,
    title: '5. Delivery & Logistics',
    description: 'Your finished products are carefully packaged and shipped, arriving on schedule and ready for distribution. We handle all logistics, so you don\'t have to.',
  },
];

export default function ProcessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                 <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 text-center bg-card/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                            A Journey of Precision
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                            Our streamlined process ensures quality, accuracy, and reliability from the first sketch to the final delivery. We've perfected every step to guarantee your complete satisfaction.
                        </p>
                    </div>
                </section>

                <section id="process-steps" className="py-24 sm:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {processSteps.map((step, index) => (
                                <Card key={index} className="flex flex-col bg-card/60 border-border/50 hover:border-accent hover:bg-card transition-all duration-300 transform hover:-translate-y-1">
                                    <CardHeader className="flex-grow">
                                        <div className="mb-4">
                                            <step.icon className="h-10 w-10 text-accent" />
                                        </div>
                                        <CardTitle className="text-2xl">{step.title}</CardTitle>
                                        <CardDescription className="pt-2 text-base">
                                            {step.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                             <Card className="flex flex-col justify-center items-center bg-accent text-accent-foreground md:col-span-2 lg:col-span-1">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl">Ready to Start?</CardTitle>
                                    <CardDescription className="text-accent-foreground/80 pt-2 text-base">
                                        Let's bring your idea to life. Contact us today to begin the design and consultation phase.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
