import { BeatsClass, ReviewsClass } from "@/types";
import { createUserSession } from "../userSession";

export function processUserData(response: any) {
    const bougthBeats = processBeats(response.bougthBeats);
    const ownedBeats = processBeats(response.createdBeats);
    const ownedReviews = processReviews(response.userReviews);
    const orders = response.userOrders;
    const favoriteBeats = processBeats(response.userFavorites);
  
    const auth = {
      isSeller: response.isSeller,
      isAdmin: response.superAdmin,
    };
  
    const session = createUserSession(response);
  
    return { auth, session, bougthBeats, ownedBeats, ownedReviews, orders, favoriteBeats };
  }
  
  // Helper function to process beats
  function processBeats(beats: BeatsClass[]) {
    return beats
      .filter((beat: BeatsClass) => !beat.softDelete)
      .map((beat: BeatsClass) => ({
        ...beat,
        review: processReviews(beat.review),
      })) as BeatsClass[];
  }
  
  // Helper function to process reviews
  function processReviews(reviews: ReviewsClass[]) {
    return reviews.filter((review: ReviewsClass) => !review.softDelete);
  }