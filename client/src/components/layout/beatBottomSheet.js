export default function BeatBottomSheet({ children }) {
  return (
    <>
    <div class="z-10 absolute w-full h-full top-0 left-0 bg-gray-600 opacity-50  rounded-tr-3xl rounded-tl-3xl"></div>
      <div class="z-20 max-h-[80vh] min-h-[50vh] absolute w-full bottom-0 left-0 bg-white pb-10 pt-5 rounded-tr-3xl rounded-tl-3xl">
          {children}
      </div>
    </>
  );
}
