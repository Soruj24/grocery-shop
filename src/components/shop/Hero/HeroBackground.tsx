import Image from "next/image";

export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617]/40 to-transparent z-10" />
      <Image
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000"
        alt="Fresh Groceries"
        fill
        className="object-cover transition-transform duration-[5000ms] group-hover:scale-110"
        priority
      />
      {/* Modern Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/10 blur-[150px] rounded-full -mr-64 -mt-64 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -ml-64 -mb-64 z-0 pointer-events-none" />
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent z-10" />
    </>
  );
}
