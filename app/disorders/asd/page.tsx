"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Eye, MessageSquare, Mic } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ASDPage() {
  const aiTests = [
    {
      icon: Eye,
      title: "Eye Tracking Test",
      description:
        "Upload a short video of facial expressions and eye movements. Our AI analyzes gaze patterns and attention focus to assist in ASD screening.",
      color: "text-blue-500",
    },
    {
      icon: MessageSquare,
      title: "Social Behavior Analysis",
      description:
        "Complete our AI-powered questionnaire about social interactions. Natural Language Processing helps evaluate social communication patterns.",
      color: "text-green-500",
    },
    {
      icon: Mic,
      title: "Speech Pattern Analysis",
      description:
        "Record a voice sample for our AI to analyze speech patterns, tone variations, and verbal communication characteristics.",
      color: "text-purple-500",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-[#E6F3FF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Autism Spectrum Disorder (ASD)
              <br />
              <span className="text-2xl md:text-3xl text-muted-foreground">
                AI-Powered Assessment Tools
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience our innovative AI-based screening tools designed to
              assist in the early detection and assessment of Autism Spectrum
              Disorder characteristics.
            </p>
            <Link href="/disorders/asd/camera">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Tests Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              AI-Based Assessment Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive suite of AI-powered tools helps in preliminary
              screening
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiTests.map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full p-8 hover:shadow-xl transition-all duration-500">
                  <test.icon className={`h-12 w-12 ${test.color} mb-6`} />
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {test.title}
                  </h3>
                  <p className="text-muted-foreground">{test.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-[#E6F3FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">
                Understanding ASD Assessment
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our AI-powered tools complement traditional diagnostic methods,
                providing initial insights that can help guide further
                professional evaluation.
              </p>
              <Button className="text-lg">
                Learn More About ASD
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm">
                <Brain className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-4">Important Note</h3>
                <p className="text-muted-foreground">
                  These AI tools are designed for screening purposes only and do
                  not replace professional medical diagnosis. Always consult
                  with qualified healthcare professionals for proper evaluation
                  and diagnosis.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
