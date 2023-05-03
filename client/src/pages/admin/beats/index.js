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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetBeats,
  adminDeleteBeat,
  setCurrentEditingBeat,
} from "@/redux/slices/admin/beats";

import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

export default function SellerDashboardOverview() {
  const [t] = useTranslation("global");
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state.admin);
  const beatData = useSelector((state) => state.admin.beats.beats) || [];

  // const page = useSelector((state) => state.admin.currentBeatPage);
  //const allBeats = useSelector((state) => state.admin.beatsForms);

  const [beatToDelete, setBeatToDelete] = useState(null);

  // const itemsPerPage = 5;
  // const totalPages = Math.ceil(allBeats.length / itemsPerPage);
  const delayedAdminGetBeats = useMemo(
    () => debounce((value) => dispatch(adminGetBeats(value)), 500),
    [dispatch]
  );

  useEffect(() => {
    const cancelDebounce = () => {
      delayedAdminGetBeats.cancel();
    };

    delayedAdminGetBeats();

    return cancelDebounce;
  }, [delayedAdminGetBeats]);

  const handleCloseModal = async () => {
    setBeatToDelete(null);
  };

  const handleEdit = async (data) => {
    await dispatch(setCurrentEditingBeat(data));
    router.push(`/admin/beats/${data._id}`);
  };

  const headers = ["Beat","Status", "AudioMP3", t("dashboardNav.actions")];

  const [actionsVar, setActionsVar] = useState("");
  useEffect(() => {
    setActionsVar(t("dashboardNav.actions").toLocaleLowerCase());
  }, [t("dashboardNav.actions")]);


  const rows = beatData.map((item) => {
    return {
      beat: (
        <div className="flex items-center gap-4">
          <Image
            src={item.image}
            width={70}
            height={70}
            className="aspect-square rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-base-medium">{item.name}</h3>
            <p className="text-sm-light">
              {item.userCreator.firstName} {item.userCreator.lastName}
            </p>
            <p className="text-sm-light">${item.priceAmount}</p>
          </div>
        </div>
      ),
      audiomp3: (
        <div className="w-max-[30px] flex items-center">
          <audio controls className="w-full">
            <source src={item.audioMP3} type="audio/mpeg"/>
          </audio>
        </div>
      ),
      status: item.softDelete ? t("dashboardNav.status1") : t("dashboardNav.status2"),
      [actionsVar]: (
        <div className="flex w-max gap-4" key={item._id}>
          <button
            onClick={() => handleEdit(item)}
            className=" hover:background-neutral-gray-700 text-sm-semibold 
            border-radius-estilo2 text-black dark:text-white"
          >
            {t("dashboardNav.edit")}
          </button>
          <button
            onClick={() => setBeatToDelete(item)}
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
      <Head title="Beats" />
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage= {t("dashboardNav.title")}
          topBarButtonLabel={t("dashboardNav.createBeat")}
          onClick={() => {
            router.push("/admin/beats/create");
          }}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8">
            <DynamicTable headers={headers} rows={rows} />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
      {beatToDelete && (
        <ModalTables
          label="Beat"
          name={"name"}
          element={beatToDelete}
          onClose={handleCloseModal}
          onConfirm={() => dispatch(adminDeleteBeat(beatToDelete))}
        />
      )}
    </>
  );
}
