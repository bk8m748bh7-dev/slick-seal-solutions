import { ClipboardCheck, Search, Hammer, CheckCircle2 } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      number: "01",
      title: "Initial Consultation",
      description: "We assess your property and discuss your specific waterproofing needs and requirements.",
    },
    {
      icon: Search,
      number: "02",
      title: "Detailed Inspection",
      description: "Our experts conduct a thorough roof inspection using advanced detection equipment.",
    },
    {
      icon: Hammer,
      number: "03",
      title: "Professional Application",
      description: "We apply premium waterproofing systems using proven techniques and quality materials.",
    },
    {
      icon: CheckCircle2,
      number: "04",
      title: "Quality Assurance",
      description: "Rigorous testing and inspection to ensure complete waterproof protection.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A proven methodology that guarantees exceptional results every time
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 relative z-10">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-primary font-bold text-lg shadow-glow">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-2xl p-8 shadow-elegant">
            <p className="text-lg mb-4">
              <span className="font-bold text-primary">From start to finish:</span> We complete most projects within{" "}
              <span className="font-bold text-secondary">3-7 business days</span>
            </p>
            <p className="text-muted-foreground">
              Emergency services available with 24-hour response time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
