import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Reviews from "../components/Reviews";
import JoinModal from "../components/JoinModal";
import SignInModal from "../components/SignInModal";
import { TypewriterEffectSmooth } from "../components/ui/TypewriterEffect";
import {GoogleLogin} from "@react-oauth/google";
import {googleSignin} from "../services/user-service.ts";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();
  if (currentUser) {
    navigate({ to: "home/me" });
  }

  const words = [
    {
      text: "Find",
    },
    {
      text: "your",
    },
    {
      text: "next",
    },
    {
      text: "destination",
    },
    {
      text: "with",
    },
    {
      text: "Advizors.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <div className="h-[43rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
        {/* Radial gradient for the container to give a faded look */}
        {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
        {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"> */}
        <div className="flex flex-col items-center justify-center h-[15rem]  ">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
            The road to freedom starts from here
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <JoinModal />
            <SignInModal />
          </div>
          <div className="flex mt-2">
            <GoogleLogin onSuccess={async (credRes) => {
              console.log(credRes)
              const res = await googleSignin(credRes)
              localStorage.setItem("currentUser", JSON.stringify(res));
              res._id ? navigate({ to: "/home/me" }) : console.log(res)
            }} onError={() => console.log("Fuck")}/>
          </div>
        </div>
        <Reviews />
        {/* </p> */}
      </div>
    </>
  );
}
