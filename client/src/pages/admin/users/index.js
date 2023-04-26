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
import { adminGetUsers, adminDeleteUser, setCurrentEditUser, setCurrentPage } from "@/redux/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { pageExtensions } from "../../../../next.config";

export default function SellerDashboardOverview() {
 // const usersData = usuariosDos

  const router = useRouter();
  const [elementToDelete, setElementToDelete] = useState(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const usersData = users;
  const page = useSelector((state)=> state.admin.currentPage);

  
  console.log("usersData", usersData);

  useEffect(() => {
    dispatch(adminGetUsers(page));
  }, [page]);

  useEffect(() => {
    dispatch(adminGetUsers(page));
  }, [page]);

  const handleCloseModal = async() => {
     dispatch(adminGetUsers(page));
     setElementToDelete(null);
  };

  const handleEdit = async(data) => {
    console.log("handleEdit", data);
    await dispatch(setCurrentEditUser(data));
router.push(`/admin/users/${data._id}`);
  };

console.log("la pagina", page)

  const headers = [
    "User",    
    "Email",
    "IsSeller",
    "SoftDelete",
    "Edit",
    "Delete",
  ];

  const rows = usersData.map((item) => {
    return {      
      user: (
        <div className="flex items-center gap-4 max-w-[50px]">
          <Image
            src={item.image}
            width={50}
            height={50}
            className="aspect-square rounded-full object-cover"
          />
          <h3 className="text-base-medium max-w-[50px] overflow-ellipsis">{item.username}</h3>
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
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 w-full">
            <DynamicTable 
            headers={headers} 
            rows={rows}  />
            <div className="flex justify-center gap-4">
         <button
          onClick={() => dispatch(setCurrentPage(page-1))}
          disabled={page === 1}
          className={page === 1 ? "hidden" : "text-red-700"}
        >
          <span className="mr-2">&#11164;</span>
        </button>        
        <button
          onClick={() => {
            dispatch(setCurrentPage(page + 1));
          }}
          disabled={usersData.length<5}
          className={
            usersData.length<5
              ? "hidden"
              : "text-red-700"
          }
        >          
          <span className="ml-2">&#11166;</span> 
        </button>
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
          onConfirm={() =>
            dispatch(adminDeleteUser(elementToDelete))
          }          
        />
      )}      
    </>
  );
}