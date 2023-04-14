export default function Section(props) {
  return (
    <section
      className={`flex w-full flex-row justify-center ${props.className} `}
      style={props.style}
    >
      <div className={props.subClassName}>{props.children}</div>
    </section>
  );
}
