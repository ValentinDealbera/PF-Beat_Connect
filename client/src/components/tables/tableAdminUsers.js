import * as React from "react";
import { useTable } from "react-table";
import { useRouter } from "next/router";
import { useState } from "react";


export default function TableAdminUsers({ data }) {
  const router = useRouter();
  const [userToDelete, setUserToDelete] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "IMAGE",
        accessor: "image",
        Cell: ({ cell: { value } }) => (
          <div className="flex justify-start">
            <img
              src={value}
              alt="Profile"
              className="border-radius-full w-[50px] h-[50px] aspect-square mr-auto object-cover"
            />
          </div>
        ),
      },
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ cell: { value } }) => (
          <div className="truncate w-min-[70px]" >
            {value}
          </div>
        ),
      },   
      {
        Header: "USERNAME",
        accessor: "username",
        Cell: ({ cell: { value } }) => (
          <div className="truncate w-min-[200px]">
            {value}
          </div>
        ),
      },
      {
        Header: "MAIL",
        accessor: "email",
        Cell: ({ cell: { value } }) => (
          <div className="truncate w-min-[200px]" >
            {value}
          </div>
        ),
      },
      {
        Header: "SELLER",
        accessor: "isSeller",
        Cell: ({ cell: { value } }) => (
          <div className="truncate w-min-[200px]">
            {value ? "TRUE" : "FALSE"} 
          </div>
        ),
      },
      {
        Header: "SOFT DELETE",
        accessor: "softDelete",
        Cell: ({ cell: { value } }) => (
          <div className="truncate w-min-[200px]" >
            {value ? "TRUE": "FALSE"}
          </div>
        ),
      },
      {
        Header: "EDIT",
        accessor: "edit",
        Cell: ({ row: { original } }) => (
          <button
            onClick={() => router.push(`/admin/users/${original.id}`)}
            className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
            text-sm-semibold py-2 px-4 border-radius-estilo2"
          >
            Edit
          </button>
        ),
      },
      {
        Header: "DELETE",
        accessor: "delete",
        Cell: ({ row: { original } }) => (
          <button
            onClick={() => setUserToDelete(original)}
            className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
            text-sm-semibold py-2 px-4 border-radius-estilo2"
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const parsedData = React.useMemo(() => JSON.parse(data), [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: parsedData });

  return (
    <div className="flex w-full w-min-[800px] border border-radius-estilo2 overflow-x-auto overflow-y-auto font-britanicaBold 
    text-subtitulo-semibold gap-estilo4 background-neutral-white">
      <table {...getTableProps()} className="table-fixed" >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    className: "px-4 py-2 text-left border-b border-gray-300 text-base-medium overflow-ellipsis",
                  })}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}                
                className="cursor-pointer hover:bg-gray-200"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps({
                      className: "px-4 py-2 text-left border-b border-gray-300 overflow-ellipsis text-base-light",
                    })}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}          
        </tbody>
      </table>

      {userToDelete && (
  <div
    className="fixed inset-0 z-50 flex justify-center items-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="background-neutral-white w-96 p-8 border-radius-estilo2">
      <h2 className="text-xl font-bold mb-4">Delete User</h2>
      <p className="text-sm mb-4">
        Are you sure you want to delete user {userToDelete.id} -{" "}
        {userToDelete.name}?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setUserToDelete(null)}
          className="background-neutral-gray-400 hover:background-neutral-gray-700 color-neutral-white 
                  text-sm-semibold py-2 px-4 border-radius-estilo2"
        >
          Cancel
        </button>
        <button
          onClick={() => console.log(`Eliminando usuario con id ${userToDelete.id}`)}
          className="background-primary-red-500 hover:background-primary-red-700 color-neutral-white 
                  text-sm-semibold py-2 px-4 border-radius-estilo2"
        >
          Yes, I'm sure
        </button>
      </div>
    </div>
  </div>
)}
    </div> 
  );
}
