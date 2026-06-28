"use client";

import { useProductReviews } from "@/hooks/useProductReviews";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function CustomerReviews({
  productId,
}: {
  productId: string;
}) {
  const {
    items,
    avg,
    count,
    isFormOpen,
    name,
    setName,
    rating,
    setRating,
    comment,
    setComment,
    submitting,
    openForm,
    closeForm,
    submitReview,
  } = useProductReviews(productId);

  return (
    <>
      <ReviewList
        items={items}
        avg={avg}
        count={count}
        onWriteReview={openForm}
      />
      <ReviewForm
        isOpen={isFormOpen}
        onClose={closeForm}
        name={name}
        onNameChange={setName}
        rating={rating}
        onRatingChange={setRating}
        comment={comment}
        onCommentChange={setComment}
        submitting={submitting}
        onSubmit={submitReview}
      />
    </>
  );
}
