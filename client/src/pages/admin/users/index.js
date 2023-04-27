import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables,
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  adminGetUsers,
  adminDeleteUser,
  setCurrentEditUser,
  setCurrentPage,
  adminGetUsersForms,
} from "@/redux/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pageExtensions } from "../../../../next.config";

export default function SellerDashboardOverview() {
  const router = useRouter();
  const [elementToDelete, setElementToDelete] = useState(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const usersData = users;
  const page = useSelector((state) => state.admin.currentPage);
  const allUsers = useSelector((state) => state.admin.usersForms);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  console.log("usersData", usersData);

  useEffect(() => {
    dispatch(adminGetUsers(page));
  }, [page]);

  useEffect(() => {
    dispatch(adminGetUsersForms());
  }, []);

  const handleCloseModal = async () => {
    dispatch(adminGetUsers(page));
    setElementToDelete(null);
  };

  const handleEdit = async (data) => {
    console.log("handleEdit", data);
    await dispatch(setCurrentEditUser(data));
    router.push(`/admin/users/${data._id}`);
  };

  console.log("la pagina", page);

  const headers = [
    "Usuario",
    "Email",
    "Vendedor",
    "Status",
    "Editar",
    "Eliminar",
  ];

  const rows = usersData.map((item) => {
    return {
      usuario: (
        <div className="flex max-w-[50px] items-center gap-4">
          <Image
            src={item.image}
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover"
          />
          <h3 className="text-base-medium max-w-[50px] overflow-ellipsis">
            {item.username}
          </h3>
        </div>
      ),
      email: item.email,
      vendedor: item.isSeller ? "Si" : "No",
      status: item.softDelete ? "Banned" : "Ok",
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
          onClick={() => setElementToDelete(item)}
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
          topBarMessage="Usuarios de la pagina"
          topBarButtonLabel="Crear usuario"
          onClick={() => {
            router.push("/admin/users/create");
          }}
        >
          <IslandDashboard className="flex w-full flex-col gap-5 xl:gap-8">
            <DynamicTable headers={headers} rows={rows} />
            <div className="flex justify-center gap-4">
              {page > 1 && (
                <button
                  onClick={() => dispatch(setCurrentPage(page - 1))}
                  className="text-red-700"
                >
                  &#11164;
                </button>
              )}

              {[...Array(Math.min(totalPages, 3))].map((_, index) => {
                const pageNumber = page - 1 + index;
                return (
                  pageNumber < totalPages && (
                    <button
                      key={pageNumber}
                      onClick={() => dispatch(setCurrentPage(pageNumber + 1))}
                      className={pageNumber + 1 === page ? "font-bold" : ""}
                    >
                      {pageNumber + 1}
                    </button>
                  )
                );
              })}

              {page < totalPages && (
                <button
                  onClick={() => dispatch(setCurrentPage(page + 1))}
                  className="text-red-700"
                >
                  &#11166;
                </button>
              )}
            </div>
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
      {elementToDelete && (
        <ModalTables
          label="User"
          name={"username"}
          element={elementToDelete}
          onClose={handleCloseModal}
          onConfirm={() => dispatch(adminDeleteUser(elementToDelete))}
        />
      )}
    </>
  );
}
