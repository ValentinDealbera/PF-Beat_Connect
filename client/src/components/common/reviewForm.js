import { Main, Button, SwitchForm, Input, FormContainer } from "@/components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBeatReview } from "@/redux/slices/client";

export default function ReviewForm(props) {
  const [formFields, setFormFields] = useState({
    title: "",
    comment: "",
  });
  const [ratingValue, setRatingValue] = useState(0);

  const createdBy = useSelector((state) => state.client.client._id);
  const dispatch = useDispatch();

  const rating = [1, 2, 3, 4, 5];

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      postBeatReview({
        ...formFields,
        createdBy: createdBy,
        beat: props.beatId,
        rating: ratingValue,
      })
    );
  };

  return (
    <Main>
      <div className="flex gap-4">
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
          <Input
            name={"title"}
            label={"Title"}
            placeholder={"Title:"}
            type={"text"}
            onChange={handleInputChange}
          />
          <Input
            name={"comment"}
            label={"Comment"}
            placeholder={"Comment:"}
            type={"text"}
            onChange={handleInputChange}
          />
        </FormContainer>
        <button
          type="submit"
          className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
            text-sm-semibold border-radius-estilo2 px-4 py-2"
        >
          Postear Review
        </button>
      </form>
    </Main>
  );
}
//rating, title, comment, createdBy, beat
//step para el rating 0.1
