export const headerStyles = {
  default: {
    background: "#00000000",
    top: 0,
  },
  alternative: {
    background: "#000000b3",
    backdropFilter: "blur(3px)",
    top: 0,
  },
};

type NavBuilderProps = {
  t: any;
  managePostBeat: any;
  setHamburguerVisible: any;
  router: any;
};

export const navBuilder = ({
  t,
  managePostBeat,
  setHamburguerVisible,
  router,
}: NavBuilderProps) => {
  return [
    {
      name: t("navClient.t1"),
      url: "/client",
      colorMode: "light",
      visibility: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/client");
      },
    },
    {
      name: t("navClient.t3"),
      url: "",
      // onClick: () => {manageBecomeSeller(), setHamburguerVisible(false)},
      //visibility: !isSeller,

      visibility: true,
    },
    {
      name: t("navClient.t4"),
      url: "",
      onClick: () => {
        managePostBeat(), setHamburguerVisible(false);
      },
      // visibility: isSeller,
      visibility: true,
    },
    {
      name: t("navClient.t5"),
      url: "/client/settings",
      colorMode: "light",
      visibility: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/client/settings");
      },
    },
    {
      name: t("navClient.t6"),
      url: "/client/billing",
      colorMode: "light",
      visibility: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/client/billing");
      },
    },
    {
      name: t("navClient.t7"),
      url: "/auth/logout",
      colorMode: "light",
      visibility: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/auth/logout");
      },
    },
  ];
};
