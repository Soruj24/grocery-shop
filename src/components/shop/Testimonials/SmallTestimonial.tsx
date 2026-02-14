interface SmallTestimonialProps {
  quote: string;
  author: string;
  initial: string;
  variant: 'orange' | 'blue';
}

export default function SmallTestimonial({ quote, author, initial, variant }: SmallTestimonialProps) {
  const styles = {
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/10',
      border: 'border-orange-100 dark:border-orange-800',
      initialBg: 'bg-orange-100 dark:bg-orange-900/30',
      initialText: 'text-orange-600',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      border: 'border-blue-100 dark:border-blue-800',
      initialBg: 'bg-blue-100 dark:bg-blue-900/30',
      initialText: 'text-blue-600',
    }
  };

  const style = styles[variant];

  return (
    <div className={`${style.bg} rounded-[50px] p-8 border ${style.border} flex flex-col justify-between`}>
      <p className="text-gray-700 dark:text-gray-300 font-bold">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 mt-6">
        <div className={`w-10 h-10 rounded-xl ${style.initialBg} flex items-center justify-center font-black ${style.initialText}`}>
          {initial}
        </div>
        <h4 className="font-black text-gray-800 dark:text-gray-200">
          {author}
        </h4>
      </div>
    </div>
  );
}
