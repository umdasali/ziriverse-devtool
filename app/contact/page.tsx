"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MessageSquare,
  Code2,
  Briefcase,
  Heart,
} from "lucide-react";

export default function ContactPage() {
  const locations = [
    {
      city: "Dhanbad",
      state: "Jharkhand",
      country: "India",
      icon: MapPin,
    },
    {
      city: "New Town, Kolkata",
      state: "West Bengal",
      country: "India",
      icon: MapPin,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/umdasali",
      username: "@umdasali",
      description: "Check out my open source projects and contributions",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/md-ali-sher-ali-265153284/",
      username: "Md Ali Sher Ali",
      description: "Connect with me professionally",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:umdasali@gmail.com",
      username: "umdasali@gmail.com",
      description: "Send me a message directly",
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 py-20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              <MessageSquare className="w-3 h-3 mr-2" />
              Let's Connect
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to collaborate? I'd love to hear from
              you. Feel free to reach out through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ways to Connect
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose your preferred method of communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <link.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {link.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {link.username}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Locations */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Locations
              </h2>
              <p className="text-muted-foreground text-lg">
                Based in India, serving globally
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((location, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <location.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {location.city}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {location.state}, {location.country}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <Card className="border-2 bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">
                Explore My Work
              </CardTitle>
              <CardDescription className="text-base">
                Check out my projects and contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com/umdasali"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="group">
                    <Code2 className="w-5 h-5 mr-2" />
                    View GitHub Profile
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/md-ali-sher-ali-265153284/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="group">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Connect on LinkedIn
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Developer Info Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built with Passion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Branding Tools is crafted by a dedicated developer passionate about
              creating useful, privacy-first web tools. All tools are free and will
              always remain free. Your support and feedback help make this project
              better every day.
            </p>
            <div className="pt-4">
              <a href="mailto:umdasali@gmail.com">
                <Button size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Feedback
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-white">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Have a Project in Mind?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Let's discuss how we can work together to bring your ideas to life
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:umdasali@gmail.com">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me
                </Button>
              </a>
              <a
                href="https://github.com/umdasali"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
