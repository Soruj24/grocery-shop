interface PageBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function PageBackground({
  color1 = "bg-green-300 dark:bg-green-900/20",
  color2 = "bg-yellow-300 dark:bg-yellow-900/20",
  color3 = "bg-pink-300 dark:bg-pink-900/20",
}: PageBackgroundProps) {
  return (
    <>
      <div className={`absolute top-0 -left-4 w-72 h-72 ${color1} rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob pointer-events-none`} />
      <div className={`absolute top-0 -right-4 w-72 h-72 ${color2} rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none`} />
      <div className={`absolute top-[20%] left-[20%] w-72 h-72 ${color3} rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none`} />
    </>
  );
}

