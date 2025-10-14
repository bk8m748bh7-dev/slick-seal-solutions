import { Building2, Factory, Droplets, Shield, Wrench, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import commercialImage from "@/assets/service-commercial.jpg";
import industrialImage from "@/assets/service-industrial.jpg";

const Services = () => {
  const mainServices = [
    {
      icon: Building2,
      title: "Commercial Waterproofing",
      description: "Complete waterproofing solutions for office buildings, shopping centers, and commercial properties.",
      image: commercialImage,
      features: ["Flat roof systems", "Parking deck sealing", "Balcony waterproofing"],
    },
    {
      icon: Factory,
      title: "Industrial Roof Sealing",
      description: "Heavy-duty waterproofing for warehouses, factories, and industrial facilities.",
      image: industrialImage,
      features: ["Large-scale applications", "Chemical-resistant coatings", "High-traffic areas"],
    },
  ];

  const additionalServices = [
    {
      icon: Droplets,
      title: "Leak Detection & Repair",
      description: "Advanced leak detection technology and fast repair solutions",
    },
    {
      icon: Shield,
      title: "Protective Coatings",
      description: "UV-resistant and weatherproof coating applications",
    },
    {
      icon: Wrench,
      title: "Maintenance Programs",
      description: "Scheduled maintenance to extend your roof's lifespan",
    },
    {
      icon: FileCheck,
      title: "Inspection Services",
      description: "Comprehensive roof assessments and reporting",
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive waterproofing solutions tailored to your specific needs
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <service.icon className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Request Quote
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <service.icon className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
