import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import imageUrl from "@/assets/image/cool-motorcycle-indoors.jpg";

const HeroSection = () => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };
  return (
    <div className="rounded-full " style={divStyle}>
      <div className="backdrop-blur-xl bg-black/30 h-screen  w-full opacity-97 rounded-xl lg:h-full">
        <section className="relative overflow-hidden py-24 mx-auto container ">
          <div className="">
            <div className=" relative z-10 ">
              <div className="mx-auto flex max-w-full flex-col items-center ">
                <div className="flex flex-col items-center gap-6 text-center mt-10">
                  <div className="bg-background/30 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                    <Logo></Logo>
                  </div>
                  <div className="">
                    <h1 className="mb-6 text-pretty text-2xl font-bold tracking-tight lg:text-5xl">
                      Welcome to{" "}
                      <span className="text-primary">Encrypted Service</span>
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-3xl lg:text-xl">
                      Here at Encrypted Service, we prioritize your privacy and
                      data security above all else. Our platform is designed to
                      provide top-notch ride sharing services while ensuring
                      that your personal information remains confidential and
                      protected.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    <Button className="shadow-sm transition-shadow hover:shadow">
                      Request a Ride
                    </Button>
                    <Button variant="outline" className="group">
                      Register as a Driver{" "}
                      <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { HeroSection };
