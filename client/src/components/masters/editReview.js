import {
  Main,
  Input,
  FormContainer,
  FormRow,
  FormColumn,
  TextArea,
} from "@/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClientReview } from "@/redux/slices/client/reviews";

export default function EditReviewForm(props) {
  const currentReview = useSelector(
    (state) => state?.client?.reviews?.activeEditingReview
  );

  const [formFields, setFormFields] = useState({
    title: currentReview.title,
    comment: currentReview.comment,
    rating: currentReview.rating,
    createdBy: currentReview?.createdBy?._id,
    beat: currentReview?.beat?._id,
  });

  const [ratingValue, setRatingValue] = useState(0);
  const dispatch = useDispatch();
  const rating = [1, 2, 3, 4, 5];

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

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(editClientReview(formFields));
    props.manageEditReview();
    // dispatch(
    //   postBeatReview({
    //     ...formFields,
    //     createdBy: createdBy,
    //     beat: props.beatId,
    //     rating: ratingValue,
    //   })
    // );
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-7 overflow-y-hidden px-14 pb-4  ">
        <div className="flex w-full flex-col gap-3 overflow-y-hidden">
          <div className="flex flex-col items-center justify-center gap-4">
            <h4 className="text-titulo3-regular text-center">
              Modifiquemos tu{" "}
              <span className="text-titulo3-semibold text-red-700">
                opinión
              </span>{" "}
            </h4>
          </div>
          <div className=" flex place-content-center gap-2">
            {rating.map((item) => (
              <>
                <button
                  onClick={() => setRatingValue(item)}
                  className="flex h-[30px] w-[30px]"
                >
                  <img
                    className="h-full w-full "
                    src={
                      item <= ratingValue
                        ? "https://www.svgrepo.com/show/13695/star.svg"
                        : "https://www.svgrepo.com/show/182485/star.svg"
                    }
                  />
                </button>
              </>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <FormRow>
                <FormColumn className="w-full">
                  <Input
                    name={"title"}
                    label={"Titulo"}
                    placeholder={"Titulo"}
                    type={"text"}
                    onChange={handleInputChange}
                    className="w-full"
                    defaultValue={currentReview.title}
                  />
                  <TextArea
                    name={"comment"}
                    label={"Comentario"}
                    placeholder={"Comentario"}
                    type={"text"}
                    onChange={handleInputChange}
                    className=" w-full"
                    defaultValue={currentReview.comment}
                  />
                </FormColumn>
              </FormRow>
              <button
                type="submit"
                className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
              >
                Guardar Review
              </button>
            </FormContainer>
          </form>
        </div>
      </div>
    </>
  );
}
//rating, title, comment, createdBy, beat
//step para el rating 0.1
