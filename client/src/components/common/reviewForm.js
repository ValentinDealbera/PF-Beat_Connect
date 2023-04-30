import {
  Input,
  FormContainer,
  FormColumn,
  FormRow,
  TextArea,
} from "@/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postClientReview } from "@/redux/slices/client/reviews";

export default function ReviewForm(props) {
  const currentBeat = useSelector(
    (state) => state?.client?.reviews?.activeBeatCreateReview
  );

  const currentUserId = useSelector(
    (state) => state?.client?.authSession?.session?.current?._id
  );

  const dispatch = useDispatch();
  const rating = [1, 2, 3, 4, 5];

  const [ratingValue, setRatingValue] = useState(0);
  const [formFields, setFormFields] = useState({
    title: "",
    comment: "",
    rating: ratingValue ?? 0,
    createdBy: currentUserId ?? "",
    beat: currentBeat._id ?? "",
  });

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);
    await dispatch(postClientReview(formFields));
    props.manageCreateReview();
  };

  useEffect(() => {
    setFormFields({
      ...formFields,
      createdBy: currentUserId,
      beat: currentBeat._id,
      rating: ratingValue,
    });
  }, [ratingValue, currentUserId, currentBeat]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-7 px-4 xs:px-8 sm:px-14 sm:py-10 overflow-y-hidden  ">
      <div className="flex w-full flex-col gap-3 overflow-y-hidden">
        <div className="flex flex-col items-center justify-center gap-4">
          <h4 className="text-titulo3-regular text-center">
            Dejanos tu{" "}
            <span className="text-titulo3-semibold text-red-700">opinión</span>{" "}
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
                />
                <TextArea
                  name={"comment"}
                  label={"Comentario"}
                  placeholder={"Comentario"}
                  type={"text"}
                  onChange={handleInputChange}
                  className="h-24 w-full"
                />
              </FormColumn>
            </FormRow>
            <button
              type="submit"
              className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
            >
              Postear Review
            </button>
          </FormContainer>
        </form>
      </div>
    </div>
  );
}
//rating, title, comment, createdBy, beat
//step para el rating 0.1
