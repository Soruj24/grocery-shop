interface OfferBannerProps {
  badge: string;
  title: string;
  desc: string;
  buttonText: string;
  image: string;
  gradient: string;
  shadow: string;
  textColor: string;
  buttonTextColor: string;
  rotate?: string;
}

export default function OfferBanner({
  badge,
  title,
  desc,
  buttonText,
  image,
  gradient,
  shadow,
  textColor,
  buttonTextColor,
  rotate = "-rotate-6"
}: OfferBannerProps) {
  return (
    <div className={`group relative ${gradient} rounded-[50px] p-10 overflow-hidden flex flex-col justify-center min-h-[350px] shadow-2xl ${shadow}`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="relative z-10 text-white max-w-md">
        <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
          {badge}
        </span>
        <h3 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-white/80 text-lg mb-8 font-medium">
          {desc}
        </p>
        <button className={`bg-white ${buttonTextColor} hover:bg-white/90 px-8 py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95`}>
          {buttonText}
        </button>
      </div>
      <img
        src={image}
        className={`absolute right-[-10%] top-1/2 -translate-y-1/2 h-[120%] w-1/2 object-contain group-hover:scale-110 group-hover:${rotate} transition-transform duration-700 pointer-events-none drop-shadow-2xl`}
        alt={title}
      />
    </div>
  );
}
