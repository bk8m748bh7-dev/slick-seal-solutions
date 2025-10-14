import { CheckCircle, Target, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Meticulous attention to detail in every project",
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Certified professionals with decades of experience",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Latest waterproofing technology and methods",
    },
    {
      icon: CheckCircle,
      title: "Quality",
      description: "Premium materials and guaranteed workmanship",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">NuSeal Waterproofing</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            For over two decades, NuSeal Waterproofing has been South Africa's trusted partner in commercial and industrial roof sealing solutions. We specialize in protecting your valuable assets with advanced waterproofing systems that stand the test of time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-in-up border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <value.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-elegant">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                To provide unparalleled waterproofing solutions that protect commercial and industrial properties across South Africa. We combine cutting-edge technology with traditional craftsmanship to deliver results that exceed expectations.
              </p>
              <ul className="space-y-3">
                {[
                  "100% waterproof guarantee",
                  "Eco-friendly materials",
                  "Comprehensive warranties",
                  "24/7 emergency response",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm">Customer Satisfaction</div>
              </div>
              <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-xl p-6 text-primary">
                <div className="text-4xl font-bold mb-2">15yr</div>
                <div className="text-sm">Warranty Coverage</div>
              </div>
              <div className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-6 text-accent-foreground">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm">Projects Done</div>
              </div>
              <div className="bg-gradient-to-br from-muted to-muted/80 rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
