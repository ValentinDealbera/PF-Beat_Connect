import {
  SellerDashboardLayout,
  IslandDashboard,
  FaqsGrid,
  DynamicTable,
  ModalTables,
} from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";

import { usuariosDos } from "../../../data/fakeDB";
import { adminGetUsers, adminDeleteUser, setCurrentEditUser } from "@/redux/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SellerDashboardOverview() {
 // const usersData = usuariosDos;

  const router = useRouter();
  const [elementToDelete, setElementToDelete] = useState(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const usersData = users;

  console.log("usersData", usersData);

  useEffect(() => {
    dispatch(adminGetUsers());
  }, []);

  const handleCloseModal = async() => {
     dispatch(adminGetUsers());
     setElementToDelete(null);
  };

  const handleEdit = async(data) => {
    console.log("handleEdit", data);
    await dispatch(setCurrentEditUser(data));
router.push(`/admin/users/${data._id}`);
  };



  const headers = [
    "User",
    "Id",
    "Email",
    "IsSeller",
    "SoftDelete",
    "Edit",
    "Delete",
  ];

  const rows = usersData.map((item) => {
    return {
      id: item._id,
      user: (
        <div className="flex items-center gap-4">
          <Image
            src={item.image}
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover"
          />
          <h3 className="text-base-medium">{item.username}</h3>
        </div>
      ),
      email: item.email,
      isseller: item.isSeller ? "Yes" : "No",
      softdelete: item.softDelete ? "Banned" : "Ok",
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
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 w-5/6 overflow-x-scroll">
            <DynamicTable 
            headers={headers} 
            rows={rows}  />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
      {elementToDelete && (
        <ModalTables
          label="User"
          name={"username"}
          element={elementToDelete}
          onClose={handleCloseModal}
          onConfirm={() =>
            dispatch(adminDeleteUser(elementToDelete))
          }          
        />
      )}
    </>
  );
}
