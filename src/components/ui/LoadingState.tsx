export default function LoadingState({ message = "লোড হচ্ছে..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-gray-400 dark:text-gray-500 font-black animate-pulse uppercase tracking-widest">
        {message}
      </div>
    </div>
  );
}
