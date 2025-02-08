"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Brain, Users, ChevronDown, Star, Clock, Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      content: "The care and attention our child received was exceptional. The team's expertise made all the difference in our journey.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Parent",
      content: "Professional, compassionate, and thorough. They provided clear guidance and support throughout the process.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Parent",
      content: "We're grateful for the personalized care plan that helped our child make remarkable progress.",
      rating: 5,
    }
  ];

  const stats = [
    { label: "Years of Experience", value: "15+" },
    { label: "Families Helped", value: "10,000+" },
    { label: "Specialist Doctors", value: "50+" },
    { label: "Success Rate", value: "95%" },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-gradient-to-b from-[#E6F3FF] to-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#E6F3FF]/80 to-white/80 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">
              Nurturing Young Minds, <br />
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-transparent bg-clip-text">
                Building Brighter Futures
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Specialized pediatric care focused on neurodevelopmental and
              psychological well-being, delivered with compassion and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/assessment">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 hover:bg-secondary/50 transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToFeatures}
        >
          <ChevronDown className="h-8 w-8 text-primary/60 animate-bounce" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#E6F3FF]/20 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose KidsNeuro?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine expertise with compassion to provide the best care for your child's development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassionate Care",
                description: "Our approach focuses on understanding and supporting each child's unique needs with warmth and empathy.",
                color: "text-chart-1",
                delay: 0.2,
              },
              {
                icon: Brain,
                title: "Expert Diagnosis",
                description: "State-of-the-art assessment tools and experienced specialists ensure accurate diagnosis and treatment.",
                color: "text-chart-2",
                delay: 0.4,
              },
              {
                icon: Users,
                title: "Family Support",
                description: "We provide comprehensive support and guidance for families throughout their journey.",
                color: "text-chart-3",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true }}
              >
                <Card className="group h-full p-8 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-border/50 hover:border-primary/20">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-2xl font-semibold mb-4 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#E6F3FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Parents Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read about the experiences of families we've helped on their journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-8 bg-white/80 backdrop-blur-sm">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FFF3E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Ready to Take the First Step?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start with our comprehensive assessment to understand your child's needs better. Our team of experts is here to guide you every step of the way.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-chart-1" />
                  <span>Quick 15-minute initial assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-chart-2" />
                  <span>Flexible scheduling options</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-chart-3" />
                  <span>24/7 support available</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6">Schedule a Consultation</h3>
              <div className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full text-lg bg-primary hover:bg-primary/90"
                >
                  <Link href="/assessment">
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full text-lg"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}