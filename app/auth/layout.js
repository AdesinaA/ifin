import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <section className={`flex justify-between p-5 h-screen`}>
      <div className="basis-[35%] relative rounded-3xl px-10 py-5 space-y-10 hidden lg:block">
        <Image
          src="/Images/auth-image.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="rounded-3xl"
        />

        <div className="z-50 relative space-y-5 text-white">
          <Image
            src={`/Images/b.JPG`}
            width={40}
            height={40}
            alt="IfinOcean Logo"
          />

          <h2 className="lg:text-xl text-3xl font-bold">
            Smart Crypto Returns <br />
            Made Simple
          </h2>

          <p className="lg:text-base text-xl">
            Experience hassle free crypto investing with our professional
            portfolio management system, designed for your success
          </p>
        </div>
      </div>
      <div className="lg:basis-[65%] w-full">{children}</div>
    </section>
  );
}
