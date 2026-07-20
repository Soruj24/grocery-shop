import * as React from "react";
import { cn } from "./types";
import { Avatar } from "./Avatar";
import { Rating } from "./Rating";

export interface ReviewCardProps {
  author: string;
  authorAvatar?: string;
  rating: number;
  date?: string;
  title?: string;
  content: React.ReactNode;
  verified?: boolean;
  className?: string;
}

export function ReviewCard({
  author,
  authorAvatar,
  rating,
  date,
  title,
  content,
  verified,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-card p-5 shadow-sm",
        className,
      )}
    >
      <header className="flex items-center gap-3">
        <Avatar src={authorAvatar} name={author} size="sm" />
        <div className="min-w-0">
          <p className="font-bold text-foreground text-sm truncate">{author}</p>
          <div className="flex items-center gap-2">
            <Rating value={rating} size="xs" />
            {date && <span className="text-xs text-muted-foreground">{date}</span>}
          </div>
        </div>
        {verified && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-success bg-success-subtle px-2 py-1 rounded-full">
            Verified
          </span>
        )}
      </header>
      {title && <h4 className="mt-3 font-bold text-foreground">{title}</h4>}
      <p className="mt-1 text-body-sm text-muted-foreground">{content}</p>
    </article>
  );
}
ReviewCard.displayName = "ReviewCard";
