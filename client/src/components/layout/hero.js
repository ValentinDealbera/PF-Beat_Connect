import { Section } from "@/components";

export default function Hero(props) {
  return (
    <section
      id="hero"
      className={`relative flex w-full flex-row items-center justify-center align-middle ${props.className}`}
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
            className="absolute h-full w-full bg-black opacity-60"
            style={{ zIndex: 1 }}
          />
        </div>
      )}
      <div
        className={` flex h-full w-full  justify-center ${props.subClassName}`}
        style={{ zIndex: 2 }}
        id="hero-content"
      >
        {props.children}
      </div>
    </section>
  );
}
