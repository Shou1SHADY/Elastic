import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    const values = [
    {
      title: "Uncompromising Quality",
      description: "We use only the finest materials and state-of-the-art technology to ensure every product meets rigorous standards."
    },
    {
      title: "Client-Centric Collaboration",
      description: "Your vision is our blueprint. We work closely with you from concept to creation to deliver on your exact specifications."
    },
    {
      title: "Reliable Delivery",
      description: "Precision in manufacturing is matched by our punctuality. We deliver on time, every time."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 text-center bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
              Innovation in Every Mold
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
              ElasticForm is a B2B partner dedicated to transforming your creative ideas into tangible, high-quality custom rubber keychains and patches.
            </p>
          </div>
        </section>

        <section id="about-content" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Philosophy
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our futuristic approach to manufacturing combines precision engineering with durable materials to produce results that not only look good but last. We are the silent partner behind your brand's standout promotional material. We believe in building partnerships through quality and reliability.
                </p>
                <div className="space-y-8 pt-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                        <p className="mt-1 text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
               <div className="aspect-w-3 aspect-h-4">
                  <Image
                      src="https://picsum.photos/seed/about-us/600/800"
                      alt="Our team at work"
                      width={600}
                      height={800}
                      className="object-cover w-full h-full rounded-lg shadow-2xl"
                      data-ai-hint="team collaboration"
                  />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
