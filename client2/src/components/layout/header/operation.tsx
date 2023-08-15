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
  setBecomeSellerVisible: (arg0: boolean) => void;
  setPostBeatVisible: (arg0: boolean) => void;
  setEditBeatVisible: (arg0: boolean) => void;
};

export const navBuilder = ({
  t,
  managePostBeat,
  setHamburguerVisible,
  router,
  setBecomeSellerVisible,
  setPostBeatVisible,
  setEditBeatVisible,
}: NavBuilderProps) => {
  return [
    {
      name: t("navClient.t1"),
      url: "/client",
      colorMode: "light",
      visible: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/client");
      },
    },
    {
      name: t("navClient.t3"),
      url: "",
      onClick: () => setBecomeSellerVisible(true),
      //visible: !isSeller,

      visible: true,
    },
    {
      name: t("navClient.t4"),
      url: "",
      onClick: () => setPostBeatVisible(true),
      // visible: isSeller,
      visible: true,
    },
    {
      name: t("navClient.t5"),
      url: "/client/settings",
      colorMode: "light",
      visible: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/client/settings");
      },
    },
    {
      name: t("navClient.t6"),
      url: "/client/billing",
      colorMode: "light",
      visible: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/client/billing");
      },
    },
    {
      name: t("navClient.t7"),
      url: "/auth/logout",
      colorMode: "light",
      visible: true,
      onClick: () => {
        setHamburguerVisible(false), router.push("/auth/logout");
      },
    },
  ];
};
