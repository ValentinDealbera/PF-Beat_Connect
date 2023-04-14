import Link from "next/link";

export default function VerticalNav(props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-2">
          {props.navItems.map((item, index) => (
            <Link href={item.url} key={index}>
              <li className="text-sm-regular text-black" >{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
