import {
  Main,
  Hero,
  BeatsShopSection,
  ProfileCard,
  Head,
  BeatShopSectionForClient,
  LandBot,
} from "@/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/redux/slices/client/authSession";

export default function BuyerProfile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.client.authSession.session.current
  );

  useEffect(() => {
    dispatch(getUserData(currentUser._id));
  }, []);

  return (
    <>
      <Head title="Buyer Profile" />
      <Main mode="transparent">
        <Hero
          style={{ height: "45vh" }}
          image={currentUser.backImage}
          alt="hero"
          className="items-center justify-center align-middle"
        >
          <div
            id="contenido"
            className="padding-x-estilo2 flex h-full w-full flex-col justify-end pb-8"
          >
            <div>
              <ProfileCard
                profilePhoto={currentUser.profilePicture}
                profileName={`${currentUser.firstName}${" "}${
                  currentUser.lastName
                }`}
                profileMessage={currentUser.bio}
              />
            </div>
          </div>
        </Hero>
        <BeatShopSectionForClient />
        <LandBot />
      </Main>
    </>
  );
}
