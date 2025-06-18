"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const pricingOptions = [
  {
    name: "Travel Agent",
    price: "$$$",
    yearlyPrice: "",
    description: "Relies on human intuition and expertise to make decisions.",
    features: [
      "Days to weeks of planning",
      "Limited knowledge and expertise",
      "Potential pricing markups",
      "Hidden costs",
      "Managed bookings",
    ],
  },
  {
    name: "Pathfinder",
    price: "Free",
    yearlyPrice: "",
    description:
      "Instantly generate personalized itineraries with AI. Get direct links to the best hotel and flight deals.",
    features: [
      "Unlimited knowledge and expertise",
      "Personalized recommendations",
      "24/7 availability",
      "Completely free",
      "Handle bookings directly",
    ],
  },
];

export function Comparison() {
  return (
    <section id="pricing">
      <div className="container mx-auto max-w-5xl py-10">
        <div className="mx-auto space-y-4 py-6 text-center">
          <h2 className="font-mono text-[14px] font-medium tracking-tight text-primary">
            Pricing
          </h2>
          <h4 className="mx-auto mb-2 max-w-3xl text-balance text-[42px] font-medium tracking-tighter text-primary">
            Simple pricing for everyone. No hidden costs.
          </h4>
        </div>
        <p className="mt-4 text-center text-xl leading-8 text-muted-foreground">
          Ditch the hidden costs of traditional travel booking and focus on your
          goals.
        </p>
        <div className="mx-auto grid gap-6 px-10 py-8 lg:grid-cols-2">
          {pricingOptions.map((option, index) => (
            <Card
              key={index}
              className={`flex flex-col shadow-none ${
                option.name === "Pathfinder" ? "border-2 border-blue-500" : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{option.name}</CardTitle>
                <p className="text-muted-foreground">{option.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold">{option.price}</div>
                <ul className="mt-4 space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {option.name === "Pathfinder" ? (
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <X className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
