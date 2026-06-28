export interface ReviewItem {
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface ReviewResponse {
  items: ReviewItem[];
  rating: number;
  count: number;
}
