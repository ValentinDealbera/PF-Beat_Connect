"use client";
import { Hero, ProfileCard } from "@/components";
import { useAppSelector } from "@/redux/hooks";

export default function HeroSection() {
  const currentUser = useAppSelector(
    (state) => state?.client?.authSession?.session?.current
  );
  return (
    <Hero
      style={{ height: "45vh" }}
      image={currentUser.backImage}
      imageAlt="hero"
      className="items-center justify-center align-middle"
      subClassName="padding-x-estilo2 flex h-full w-full flex-col !justify-end pb-8"
    >
      <ProfileCard
        profilePhoto={currentUser.profilePicture}
        profileName={`${currentUser.firstName}${" "}${currentUser.lastName}`}
        profileMessage={currentUser.bio}
      />
    </Hero>
  );
}
