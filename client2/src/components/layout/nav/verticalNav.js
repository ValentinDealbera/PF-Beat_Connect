import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function VerticalNav(props) {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={props.className}>
      <div className="flex flex-col gap-4 ">
        <ul className="flex flex-col gap-2">
          {props.navItems.map((item, index) => (
            <>
              {item.visibility === true && (
                <>
                  {item.onClick ? (
                    <li
                      className="text-sm-regular cursor-pointer text-black"
                      onClick={() => {
                        item.onClick();
                      }}
                    >
                      {item.name}
                    </li>
                  ) : (
                    <Link href={item.url} key={index}>
                      <li
                        className="text-sm-regular text-black"
                        onClick={() => {
                          props.onClick;
                        }}
                      >
                        {t(item.name)}
                      </li>
                    </Link>
                  )}
                </>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
