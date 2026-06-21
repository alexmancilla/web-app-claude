import Link from "next/link";
import { MotionDiv } from "../../library/frontend/framer/framer";
import { DROP_IN_WITH_FADE, SLIDE_IN_RIGHT_TO_LEFT_WITH_FADE } from "../../library/frontend/framer/framer_animations";
import Image from "next/image";
import { CheckoutBtn } from "./CheckoutBtn";

export async function Hero() {
  return (
    <>
      <MotionDiv {...DROP_IN_WITH_FADE} className="mx-auto flex flex-col pt-20 text-center">
        <Title />
        <div className="flex space-x-2 justify-center mt-6">
          <CheckoutBtn />
          <PricingBtn />
        </div>
      </MotionDiv>

      <MotionDiv {...SLIDE_IN_RIGHT_TO_LEFT_WITH_FADE} className="relative max-w-6xl mx-auto">
        <GradientPurple />
        <Image src="/dashboard.png" width={1000} height={5000} alt={""} className="mx-auto mt-14" />
      </MotionDiv>
    </>
  );
}

function Title() {
  return (
    <div id="title">
      <h1 className="text-5xl font-medium	tracking-tight md:text-6xl">
        <p>Ultimate web app.&nbsp;</p>
        <p>Software made easy.</p>
      </h1>
        <p className="text-md leading-8 text-gray-600 sm:text-lg mt-4" id="subtitle">
          Frontend. Backend. And everything in between.
        </p>
    </div>
  );
}

function PricingBtn() {
  return (
    <div className="flex justify-center">
      <Link href="/#pricing" className="text-md px-3.5 py-2.5 font-medium rounded-md bg-white/90 shadow-lg lg:w-[150px] border-[1px] hover:bg-gray-100 transition ease-in-out">
        Pricing
      </Link>
    </div>
  );
}

function GradientPurple() {
  return (
    <div aria-hidden="true" className="absolute -top-10 -right-20 md:right-0 -z-10 transform-gpu blur-3xl ">
      <div
        className="relative aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-purple-600 via-blue-400 to-cyan-300 opacity-30 sm:w-[72.1875rem] "
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 12.5% 26.9%, 85.5% 0.1%, 80.7% 10%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 10%, 2.6% 76.8%, 76.1% 80.7%, 54.1% 44.1%)",
        }}
      />
    </div>
  );
}
