import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables,
  Head,
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  adminGetOrders,
  adminDeleteOrder,
  setCurrentEditingOrder,
} from "@/redux/slices/admin/orders";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SellerDashboardOverview() {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const router = useRouter();
  const { orders } = useSelector((state) => state.admin.orders);
  const reviewsData = orders;

  const [reviewToDelete, setReviewToDelete] = useState(null);
  const headers = [
    "Beat",
    t("adminCreateUser.t1"),
    t("adminCreateUser.t2"),
    t("adminCreateUser.t3"),
    t("adminCreateUser.t4"),
    t("adminCreateUser.t5"),
  ];

  useEffect(() => {
    dispatch(adminGetOrders());
  }, []);

  const handleCloseModal = async () => {
    dispatch(adminGetOrders());
    setReviewToDelete(null);
  };

  const handleEdit = async (data) => {
    await dispatch(setCurrentEditingOrder(data));
    router.push(`/admin/reviews/${data._id}`);
  };

  const beatsFiltered = reviewsData.filter((item) => item.beat);

  const [buyerVar, setBuyerVar] = useState("");
  const [sellerVar, setSellerVar] = useState("");
  const [amountVar, setAmountVar] = useState("");
  const [dateVar, setDateVar] = useState("");
  const [actionsVar, setActionsVar] = useState("");
  useEffect(() => {
    setBuyerVar(t("adminCreateUser.t1").toLocaleLowerCase());
    setSellerVar(t("adminCreateUser.t2").toLocaleLowerCase());
    setAmountVar(t("adminCreateUser.t3").toLocaleLowerCase());
    setDateVar(t("adminCreateUser.t4").toLocaleLowerCase());
    setActionsVar(t("adminCreateUser.t5").toLocaleLowerCase());
  }, [t("adminCreateUser.t1"), t("adminCreateUser.t2"), t("adminCreateUser.t3"), t("adminCreateUser.t4"),t("adminCreateUser.t5")]);

  const rows = beatsFiltered.map((item) => {
    return {
      beat: (
        <div className="flex items-center gap-4 ">
          <Image
            src={item.beat.image}
            width={70}
            height={70}
            className="aspect-square rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-base-medium">{item.beat.name}</h3>
            <p className="text-sm-light">
              {item.beat.userCreator.firstName} {item.beat.userCreator.lastName}
            </p>
          </div>
        </div>
      ),
      [amountVar]: <p className="text-sm-medium">${item.beat.priceAmount}</p>,
      [buyerVar]: (
        <div className="flex items-center gap-4 ">
          <p className="text-sm-medium dark:text-white">
            {" "}
            {item.buyer && item.buyer.firstName && item.buyer.lastName
              ? item?.buyer?.firstName + " " + item?.buyer?.lastName
              : "No disponible"}
          </p>
        </div>
      ),
      [sellerVar]: (
        <div className="flex items-center gap-4 ">
          <p className="text-sm-medium dark:text-white">
            {" "}
            {item.beat.userCreator.firstName && item.beat.userCreator.lastName
              ? item.beat.userCreator.firstName +
                " " +
                item.beat.userCreator.lastName
              : "No disponible"}
          </p>
        </div>
      ),
      [dateVar]: <p className="text-sm-medium">{item.date}</p>,
      [actionsVar]: (
        <div className="flex w-max gap-4" key={item._id}>
          <button
            onClick={() => setReviewToDelete(item)}
            className=" hover:background-primary-red-700 text-sm-semibold 
              border-radius-estilo2 text-red-700 "
          >
            {t("dashboardNav.delete")}
          </button>
        </div>
      ),
    };
  });
  return (
    <>
      <Head title="Ordenes" />
      <main>
        <SellerDashboardLayout
          topBarMode="message"
          topBarMessage={t("dashboardNav.title3")}
          topBarButtonLabel="Crear rev"
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <DynamicTable headers={headers} rows={rows} />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
      {reviewToDelete && (
        <ModalTables
          label="Review"
          name={"title"}
          element={reviewToDelete}
          onClose={handleCloseModal}
          onConfirm={() => dispatch(adminDeleteOrder(reviewToDelete._id))}
        />
      )}
    </>
  );
}
