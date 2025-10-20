import { ArrowRight, Shield, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-roof.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Commercial roofing waterproofing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Professional Roof Sealing &amp; Waterproofing Solutions
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl">
            Protecting commercial and industrial buildings with advanced waterproofing systems. Over 20 years of excellence in South Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-14 px-8 shadow-glow"
            >
              Get Free Quote <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-lg h-14 px-8"
            >
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="w-8 h-8 text-secondary" />
              <div>
                <div className="text-2xl font-bold text-primary-foreground">20+</div>
                <div className="text-sm text-primary-foreground/80">Years Experience</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="w-8 h-8 text-secondary" />
              <div>
                <div className="text-2xl font-bold text-primary-foreground">500+</div>
                <div className="text-sm text-primary-foreground/80">Projects Completed</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-8 h-8 text-secondary" />
              <div>
                <div className="text-2xl font-bold text-primary-foreground">24/7</div>
                <div className="text-sm text-primary-foreground/80">Emergency Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
