import { MiniCart } from "@/components";
import ProfileBox from "./profileBox";
import LoginButton from "./loginButton";
import { useAppSelector as useSelector } from "@/redux/hooks";

type UserBoxNavProps = {
  className?: string;
  navData?: any;
  title?: string;
};

export default function UserBoxNav({ className }: UserBoxNavProps) {
  const { isLogged } = useSelector((state) => state.client.authSession.auth);

  return (
    <>
      <div
        className={`flex flex-row items-center justify-center gap-4 align-middle ${className}`}
      >
        <MiniCart />
        {isLogged ? <ProfileBox /> : <LoginButton />}
      </div>
    </>
  );
}
