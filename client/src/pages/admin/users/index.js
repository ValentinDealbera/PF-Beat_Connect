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
import {
  adminGetUsers,
  adminDeleteUser,
  setCurrentEditingUser,
  setCurrentPage,
} from "@/redux/slices/admin/users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SellerDashboardOverview() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [elementToDelete, setElementToDelete] = useState(null);
  const { users } = useSelector((state) => state.admin.users);
  const allUsers = useSelector((state) => state.admin.users.users);
  const usersData = users;

  console.log("usersData", usersData);

  useEffect(() => {
    dispatch(adminGetUsers());
  }, []);

  const handleCloseModal = async () => {
    dispatch(adminGetUsers());
    setElementToDelete(null);
  };

  const handleEdit = async (data) => {
    console.log("handleEdit", data);
    await dispatch(setCurrentEditingUser(data));
    router.push(`/admin/users/${data._id}`);
  };

  const headers = ["Usuario", "Estatus", "Acciones"];

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

          <div className="flex flex-col">
          <h3 className="text-base-medium overflow-ellipsis dark:text-white">
            {item.username}
          </h3>
            <p className="text-sm-light dark:text-white">
              {item.email}
            </p>
          </div>
        </div>
      ),
      estatus:  (<p className="text-sm-light dark:text-white">{item.softDelete ? "Baneado" : "Activo"}</p>),
      acciones: (
        <div className="flex w-max gap-4" key={item._id}>
          <button
            onClick={() => handleEdit(item)}
            className=" hover:background-neutral-gray-700 text-sm-semibold 
            border-radius-estilo2 text-black dark:text-white "
          >
            Editar
          </button>
          <button
            onClick={() => setElementToDelete(item)}
            className=" hover:background-primary-red-700 text-sm-semibold 
            border-radius-estilo2 text-red-700 "
          >
            Eliminar
          </button>
        </div>
      ),
    };
  });

  return (
    <>
      <Head title="Usuarios" />
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
