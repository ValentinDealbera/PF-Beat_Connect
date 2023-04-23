import { Main, Input, FormContainer } from "@/components";
import { useState } from "react";
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
      <div className="flex h-full w-full flex-col items-center justify-center gap-7 overflow-y-hidden px-14 pb-4  ">
        <div className="flex w-full flex-col gap-5 overflow-y-hidden">
          <div className="flex flex-col items-center justify-center gap-0">
            <h4 className="text-titulo3-regular text-center">
              Dejanos tu{" "}
              <span className="text-titulo3-semibold text-red-700">
                opinión
              </span>{" "}
            </h4>
          </div>
          <div className="my-5 flex place-content-center gap-4">
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
          <form onSubmit={handleSubmit} className=" flex-colflex ">
            <FormContainer>
              <div className="flex flex-col gap-4">
                <Input
                  name={"title"}
                  label={"Title"}
                  placeholder={"Title:"}
                  type={"text"}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <Input
                  name={"comment"}
                  label={"Comment"}
                  placeholder={"Comment:"}
                  type={"text"}
                  onChange={handleInputChange}
                  className="h-24 w-full"
                />
              </div>
            </FormContainer>
            <button
              type="submit"
              className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
            >
              Postear Review
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
}
//rating, title, comment, createdBy, beat
//step para el rating 0.1
