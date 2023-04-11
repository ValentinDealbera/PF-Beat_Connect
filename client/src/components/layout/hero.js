import { Section } from "@/components";

export default function Hero(props) {
  return (
    <section
    id="hero"
      className={`relative flex w-full flex-row justify-center align-middle items-center ${props.className}`}
      style={props.style}
    >
      {props.image && (
        <div className="absolute h-full w-full">
          <img
            src={props.image}
            alt={props.imageAlt}
            className="absolute h-full w-full object-cover"
            style={{ zIndex: 0 }}
          />
          <div
            className="absolute h-full w-full bg-black opacity-50"
            style={{ zIndex: 1 }}
          />
        </div>
      )}
      <div
        className={` h-full w-full flex  justify-center ${props.subClassName}`}
        style={{ zIndex: 2 }}
        id="hero-content"
      >
        {props.children}
      </div>
    </section>
  );
}
