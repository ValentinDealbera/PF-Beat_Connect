import Image from "next/image";

export default function BeatAudio({ beat }) {
  try {
    return (
      <audio controls className="mt-2 w-full rounded-full  bg-white">
        <source src={beat.audioMP3} type="audio/mpeg" />
      </audio>
    );
  } catch (error) {
    console.log(error);
  }
}
