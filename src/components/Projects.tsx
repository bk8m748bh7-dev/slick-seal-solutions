import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import projectImage from "@/assets/project-1.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Large Distribution Center",
      location: "Johannesburg",
      size: "15,000 m²",
      type: "Industrial",
      image: projectImage,
    },
    {
      title: "Shopping Complex",
      location: "Cape Town",
      size: "8,500 m²",
      type: "Commercial",
      image: projectImage,
    },
    {
      title: "Manufacturing Facility",
      location: "Durban",
      size: "12,000 m²",
      type: "Industrial",
      image: projectImage,
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore some of our recent waterproofing success stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  {project.type}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>📍 {project.location}</p>
                  <p>📏 {project.size} covered</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in seeing more of our work?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center text-secondary hover:text-secondary/80 font-semibold transition-colors"
          >
            Contact us for our complete portfolio →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
