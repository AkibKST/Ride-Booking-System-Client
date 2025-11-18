import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroImg1 from "@/assets/image/2206.i126.060.F.m005.c9.motorcycle bikers.jpg";
import heroImg2 from "@/assets/image/7610.jpg";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const ServiceSection = ({
  badge = "✨ Your Website Builder",
  //   heading = "Blocks Built With Shadcn & Tailwind", used raw heading in h1
  //   description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Call for Ride",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "Register as Driver",
      url: "https://www.shadcnblocks.com",
    },
  },
}: // image = {
//   src: heroImg,
//   alt: "Hero section demo image showing interface components",
// },
Hero1Props) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-8">
        <h1 className="text-3xl font-semibold md:text-4xl">
          Our <span className="text-primary"> Services</span>
        </h1>

        <div className="mt-10 flex flex-col gap-20">
          {/* Ride a request section starts */}
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {badge && (
                <Badge variant="outline">
                  Do you want a quick ride???
                  <ArrowUpRight className="ml-2 size-4" />
                </Badge>
              )}
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                Request a <span className="text-primary"> Ride </span> Now ...
              </h1>

              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                {buttons.primary && (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={buttons.primary.url}>{buttons.primary.text}</a>
                  </Button>
                )}
              </div>
            </div>
            <div className="max-h-screen w-fit rounded-4xl object-cover">
              <img
                className="rounded-4xl"
                src={heroImg1}
                alt="Motorcycle bikers"
              />
            </div>
          </div>
          {/* Ride a request section ends */}

          {/* Register as a Driver section starts */}
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="max-h-screen w-fit rounded-4xl object-cover">
              <img
                className="rounded-4xl"
                src={heroImg2}
                alt="Motorcycle bikers"
              />
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {badge && (
                <Badge variant="outline">
                  Wanna earn money by sharing ride with your own vehicle???
                  <ArrowUpRight className="ml-2 size-4" />
                </Badge>
              )}
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                Register as a <span className="text-primary"> Driver </span> !
              </h1>

              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                {buttons.primary && (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={buttons.primary.url}>{buttons.primary.text}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* Register as a Driver section ends */}
        </div>
      </div>
    </section>
  );
};

export { ServiceSection };
