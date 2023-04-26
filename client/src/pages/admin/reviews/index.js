import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables,
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  adminGetReviews,
  adminDeleteReview,
  setCurrentEditReview,
} from "@/redux/slices/admin";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function SellerDashboardOverview() {
  const { reviews } = useSelector((state) => state.admin);
  const reviewsData = reviews;
  const dispatch = useDispatch();

  const router = useRouter();
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const headers = [
    "Beat",
    "Titulo",
    "Rating",
    "Status",
    "Creador",
    "Editar",
    "Eliminar",
  ];

  useEffect(() => {
    dispatch(adminGetReviews());
  }, []);

  const handleCloseModal = async () => {
    dispatch(adminGetReviews());
    setReviewToDelete(null);
  };

  const handleEdit = async (data) => {
    console.log("handleEdit", data);
    await dispatch(setCurrentEditReview(data));
    router.push(`/admin/reviews/${data._id}`);
  };

  const rows = reviewsData.map((item) => {
    return {
      titulo: item.title,
      // id: item._id,
      rating: item.rating,
      status: item.softDelete ? "Banned" : "Ok",
      creador: item.createdBy.username,
      beat: (
        <div className="flex w-2/5 items-center gap-4">
          <Image
            src={item.beat.image}
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover"
          />
          <h3 className="text-base-medium">{item.beat.name}</h3>
        </div>
      ),
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
          onClick={() => setReviewToDelete(item)}
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
          topBarMessage="Reviews de la pagina"
          topBarButtonLabel="Crear review"
          onClick={() => {
            router.push("/admin/reviews/create");
          }}
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
          onConfirm={() => dispatch(adminDeleteReview(reviewToDelete._id))}
        />
      )}
    </>
  );
}
