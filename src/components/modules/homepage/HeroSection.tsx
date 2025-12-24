import { ExternalLink } from "lucide-react";

import Logo from "@/assets/icons/Logo";
// import imageUrl from "@/assets/image/cool-motorcycle-indoors.jpg";
import { useNavigate } from "react-router";
import LiquidEther from "@/components/LiquidEther";
import StarBorder from "@/components/StarBorder";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();
  // const divStyle = {
  //   backgroundImage: `url(${imageUrl})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   height: "100vh",
  // };
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="relative backdrop-blur-xl bg-black/30 h-screen  w-full opacity-97 rounded-xl lg:h-full"
      >
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
                  <div className="mt-6 flex justify-center">
                    <StarBorder
                      className="custom-class"
                      color="cyan"
                      speed="5s"
                    >
                      <Button onClick={() => navigate("/features")}>
                        Platform Features{" "}
                        <ExternalLink className="transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </StarBorder>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export { HeroSection };
