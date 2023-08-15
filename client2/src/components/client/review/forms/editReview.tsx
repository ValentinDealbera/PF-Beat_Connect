import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editClientReview } from "@/redux/slices/client/reviews";
import Form from "./form";

type Props = {
  manageEditReview: (value: boolean) => void;
};

export default function EditReviewForm({ manageEditReview }: Props) {
  const dispatch = useAppDispatch();
  const currentReview = useAppSelector(
    (state) => state?.client?.reviews?.activeEditingReview,
  );

  const [formFields, setFormFields] = useState({
    title: currentReview.title,
    comment: currentReview.comment,
    rating: currentReview.rating,
    createdBy: currentReview?.createdBy?._id,
    beat: currentReview?.beat?._id,
  });

  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    setRatingValue(currentReview.rating);
    setFormFields({
      title: currentReview.title,
      comment: currentReview.comment,
      rating: currentReview.rating,
      createdBy: currentReview.createdBy._id,
      beat: currentReview.beat._id,
    });
  }, [currentReview]);

  useEffect(() => {
    setFormFields({
      ...formFields,
      rating: ratingValue,
    });
  }, [ratingValue]);

  const handleInputChange = (event: any) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await dispatch(editClientReview(formFields));
    manageEditReview(false);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      ratingValue={ratingValue}
      setRatingValue={setRatingValue}
      currentReview={currentReview}
      title="editReview.t1"
      hasDefaultValues={true}
    />
  );
}
