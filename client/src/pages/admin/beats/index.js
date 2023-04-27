import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables,
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetBeats,
  adminDeleteBeat,
  adminGetBeat,
} from "@/redux/slices/admin/beats";

export default function SellerDashboardOverview() {
  const dispatch = useDispatch();
  const router = useRouter();
const state = useSelector((state) => state.admin);
console.log("STATE",state);
  const beatData = useSelector((state) => state.admin.beats.beats) || [];

 // const page = useSelector((state) => state.admin.currentBeatPage);
  //const allBeats = useSelector((state) => state.admin.beatsForms);

  const [beatToDelete, setBeatToDelete] = useState(null);

  // const itemsPerPage = 5;
  // const totalPages = Math.ceil(allBeats.length / itemsPerPage);


  useEffect(() => {
    console.log("useEffectXX");
    dispatch(adminGetBeats());
  }, []);

  const handleCloseModal = async () => {
    setBeatToDelete(null);
  };

  const handleEdit = async (data) => {
    await dispatch(setCurrentEditBeat(data));
    router.push(`/admin/beats/${data._id}`);
  };

  const headers = [
    "Item",
    "AudioMP3",
    "Creador",
    "Status",
    "Precio",
    "Editar",
    "Eliminar",
  ];

  const rows = beatData.map((item) => {
    return {
      item: (
        <div className="flex items-center gap-4">
          <Image
            src={item.image}
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover"
          />
          <h3 className="text-base-medium">{item.name}</h3>
        </div>
      ),
      audiomp3: (
        <div className="w-max-[30px] flex items-center">
          <audio controls className="w-full">
            <source src={item.audioMP3} type="audio/mpeg" />
          </audio>
        </div>
      ),
      precio: item.priceAmount,
      creador: item.userCreator ? item.userCreator.username : "",
      status: item.softDelete ? "Baneado" : "Activo",
      editar: (
        <button
          onClick={() => handleEdit(item)}
          className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
            text-sm-semibold border-radius-estilo2 px-4 py-2"
        >
          Edit
        </button>
      ),
      eliminar: (
        <button
          onClick={() => setBeatToDelete(item)}
          className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
            text-sm-semibold border-radius-estilo2 px-4 py-2"
        >
          Eliminar
        </button>
      ),
    };
  });

  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Beats de la pagina"
          topBarButtonLabel="Crear beat"
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
