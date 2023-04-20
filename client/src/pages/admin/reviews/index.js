import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables,
} from "@/components";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { adminGetReviews, adminDeleteReview, setCurrentEditReview } from "@/redux/slices/admin";
import { useDispatch } from "react-redux";

export default function SellerDashboardOverview() {
  const { reviews } = useSelector((state) => state.admin);
  const reviewsData = reviews;
  const dispatch = useDispatch();

  const router = useRouter();
  const [reviewToDelete, setReviewToDelete] = React.useState(null);
  const headers = [
    "Beat",
    "Id",
    "Title",
    "Rating",
    "Comment",
    "DateCreated",
    "CreatedBy",
    "Edit",
    "Delete",
  ];

  React.useEffect(() => {
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
      title: item.title,
      id: item.id,
      rating: item.rating,
      comment: item.comment,
      datecreated: item.dateCreated,
      createdby: item.createdBy.username,
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
      edit: (
        <button
          onClick={() => handleEdit(item)}
          className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
            text-sm-semibold border-radius-estilo2 px-4 py-2"
        >
          Edit
        </button>
      ),
      delete: (
        <button
          onClick={() => setReviewToDelete(item._id)}
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
          onConfirm={() => dispatch(adminDeleteReview(reviewToDelete))}
        />
      )}
    </>
  );
}
