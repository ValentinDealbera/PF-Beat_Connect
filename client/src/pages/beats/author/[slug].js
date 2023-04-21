import { Main, Hero, NewBeatCardGrid, ProfileCard, Head, Section, Loader } from "@/components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchCurrentAuthor } from "@/redux/slices/beats";
import { useDispatch, useSelector } from "react-redux";

export default function AuthorProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;

  useEffect(() => {
    dispatch(fetchCurrentAuthor(slug));
  }, [slug]);

  const { currentAuthor, currentAuthorBeats, loadingcurrentAuthor } = useSelector((state) => state.beats);
  console.log("currentAuthor", currentAuthor);

  return (
    <>
      <Head title="Buyer Profile" />
      <Main mode="transparent">
        <Hero style={{ height: "45vh" }} image="/images/category2.jpg">
          <div
            id="contenido"
            className="padding-x-estilo2 flex h-full w-full flex-col justify-end pb-8"
          >
            <div>
              <ProfileCard
                profilePhoto={currentAuthor?.profilePicture}
                profileName={`${currentAuthor?.firstName} ${currentAuthor?.lastName}`}
                profileMessage="Lorem ipsum dolor sit "
              />
            </div>
          </div>
        </Hero>
        <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
          {
            loadingcurrentAuthor ? <Loader/> : <NewBeatCardGrid beats={currentAuthorBeats} />
          }
        
        </Section>
      </Main>
    </>
  );
}
