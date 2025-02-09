"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Camera, GamepadIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DSPage() {
  const aiTests = [
    {
      icon: Camera,
      title: "Facial Feature Recognition",
      description:
        "Upload a photo for our AI computer vision analysis. The system examines facial characteristics associated with Down Syndrome using advanced image processing.",
      color: "text-blue-500",
    },
    {
      icon: GamepadIcon,
      title: "Cognitive Response Test",
      description:
        "Engage in interactive game-based assessments that evaluate memory, pattern recognition, and cognitive skills through AI-powered analysis.",
      color: "text-green-500",
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
              Down Syndrome
              <br />
              <span className="text-2xl md:text-3xl text-muted-foreground">
                AI-Powered Screening Tools
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our innovative AI-based screening tools designed to assist
              in the identification of Down Syndrome characteristics using
              advanced computer vision and interactive assessments.
            </p>
            <Link href="/disorders/ds/camera">
              <Button size="lg" className="text-lg px-8 py-6">
                Begin Screening
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
              AI-Based Screening Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Our specialized AI tools provide preliminary screening through
              facial analysis and cognitive assessment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                Understanding Down Syndrome Screening
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our AI-powered screening tools use advanced technology to
                identify potential indicators of Down Syndrome, supporting early
                detection and intervention.
              </p>
              <Button className="text-lg">
                Learn More About Down Syndrome
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
                <h3 className="text-xl font-semibold mb-4">Important Notice</h3>
                <p className="text-muted-foreground">
                  These AI screening tools are for preliminary assessment only
                  and should not be considered a medical diagnosis. Please
                  consult healthcare professionals for proper medical evaluation
                  and genetic testing.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
