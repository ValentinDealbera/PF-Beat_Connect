export default function Main({ children, mode }) {
  return (
    <main
      className={`flex flex-col justify-center ${
        mode === "transparent" ? " " : "pt-[105px]"
      }`}
    >
      {children}
    </main>
  );
}
