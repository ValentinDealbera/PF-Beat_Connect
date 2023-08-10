import { useRouter } from "next/router";

export default function IslandDashboard(props) {
  const router = useRouter();
  const className = `${
    router.pathname.startsWith("/admin")
      ? "dark:text-gray-300 dark:bg-customDark-900 bg-white"
      : "background-neutral-white"
  }`;
  return (
    <>
      <div
        className={`padding-island-estilo1 ${className}  border-radius-estilo1  ${
          props.className ? "" : "w-full"
        } ${props.className} `}
        style={props.style}
      >
        {props.children}
      </div>
    </>
  );
}
