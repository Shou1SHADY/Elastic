'use client';

import { CheckCircle } from "lucide-react";

export default function About() {
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
    <section id="about" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-6">
            <span className="text-sm font-bold uppercase text-accent">Who We Are</span>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Innovation in Every Mold
            </h2>
            <p className="text-muted-foreground text-lg">
              ElasticForm is a B2B partner dedicated to transforming your creative ideas into tangible, high-quality custom rubber keychains and patches. Our futuristic approach to manufacturing combines precision engineering with durable materials to produce results that not only look good but last. We are the silent partner behind your brand's standout promotional material.
            </p>
          </div>
          <div className="space-y-8">
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
      </div>
    </section>
  );
}
