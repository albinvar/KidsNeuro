"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { disorders } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";

export default function AssessmentPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDisorders = disorders.filter((disorder) =>
    disorder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0]">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#4F46E5]">
            Condition Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore our comprehensive assessment tools for various conditions.
            Select a condition to begin the evaluation process.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mb-16">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#E6F3FF] to-[#FFF3E0] blur-xl opacity-50 rounded-full" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full border border-border bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Conditions Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredDisorders.map((disorder) => (
            <motion.div
              key={disorder.id}
              variants={item}
              className="group flex flex-col h-full"
            >
              <Card className="relative flex flex-col flex-grow h-full overflow-hidden backdrop-blur-sm bg-white/80 hover:bg-white/90 transition-all duration-500 border-border/50 hover:border-primary/20 hover:shadow-xl p-8">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent to-primary/5 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                <div className="relative flex flex-col flex-grow items-center text-center">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {disorder.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary group-hover:text-[#4F46E5] transition-colors">
                    {disorder.name}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed flex-grow">
                    {disorder.description}
                  </p>
                </div>
                <Link href={`/disorders/${disorder.slug}`} passHref>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-[#E8F5E9] group-hover:border-[#E8F5E9] transition-all duration-300 py-6 text-lg flex items-center justify-center"
                  >
                    <span className="flex items-center w-full justify-center">
                      Start Assessment
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredDisorders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-xl text-muted-foreground">
              No conditions found matching "{searchTerm}"
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
