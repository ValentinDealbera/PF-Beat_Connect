import {
  BeatsSpecialSection,
  Main,
  Section,
  IslandDashboard,
  AuthorName,
  DynamicTable,
  BeatsRelatedSection,
} from "@/components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { deleteFromCart } from "@/redux/slices/cart";
import axios from "axios";
//traemos url del servidor
import { serverUrl } from "@/data/config";
import { useRouter } from "next/router";

export default function Carrito() {
  const router = useRouter();
  const dispatch = useDispatch();
  //Obtenemos los items del carrito
  const cartIds =
    useSelector((state) => state.cart.cart).map((item) => item.id) || [];
  const { publicItems } = useSelector((state) => state?.beats) || [];
  const cartItems =
    useSelector((state) => state.beats.publicItems).filter((item) =>
      cartIds.includes(item._id)
    ) || [];
  console.log(cartItems, publicItems);

  const user = useSelector((state) => state.client.client._id);

  //Creamos un array de objetos que reuna el autor del beat y el precio total de sus beats
  const precio_por_autor = [];

  cartItems.forEach((item) => {
    const { userCreator, priceAmount } = item;
    const index = precio_por_autor.findIndex(
      (item) => item.userCreator._id === userCreator._id
    );
    if (index === -1) {
      precio_por_autor.push({ userCreator, priceAmount });
    } else {
      precio_por_autor[index].priceAmount += priceAmount;
    }
  });

  console.log(precio_por_autor);
  const headers = ["Item", "Price", "Author", "Action"];

  //Generamps dinamicamente las filas de la tabla con los items del carrito
  //En items mandmaos nombre e imagen en un div
  const rows = cartItems.map((item) => {
    return {
      id: item._id,
      item: (
        <div className="flex items-center gap-4">
          <Image
            src={item.image}
            width={50}
            height={50}
            className="aspect-square rounded-full"
          />
          <h3 className="text-base-medium">{item.name}</h3>
        </div>
      ),
      price: item.priceAmount,
      author: `${item.userCreator.firstName} ${item.userCreator.lastName}`,
      action: (
        <button onClick={() => dispatch(deleteFromCart({ id: item._id }))}>
          Eliminar
        </button>
      ),
    };
  });

  //mandar un array cart, que tiene los ids de los beats que queremos comprar
  //mandar buyer, que es el id del usuario que esta comprando, obtener dinamicaente
  //mandar seller que es el id del usuario que esta vendiendo, obtener dinamicamente con precio_por_autor

  const idsOfSellers = precio_por_autor.map((item) => item.userCreator._id);
  const idsOfBuyer = user;

  const toPay = {
    cart: cartIds,
    seller: idsOfSellers[0],
    buyer: idsOfBuyer,
  };

  const handlePayment = () => {
    console.log("pagar");
    axios
      .post(`${serverUrl}cart/pay`, toPay, {
        headers: {
          "Content-Type": "application/json",
          "userid" : user
        },
      })
      .then((res) => {
        console.log(res.data);
        router.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Main mode="">
        <Section
          subClassName="padding-x-estilo2 padding-y-estilo1"
          className="bg-slate-200"
        >
          <div className="flex flex-row gap-4">
            <IslandDashboard className="flex w-full flex-col gap-4">
              <h1 className="text-titulo2-medium">Carrito</h1>
              <DynamicTable headers={headers} rows={rows} />
            </IslandDashboard>
            <IslandDashboard className="flex w-[40%] flex-col gap-4">
              <h2 className="text-subtitulo-medium">Tu orden</h2>
              <div id="precio_por_autor" className="flex flex-col gap-4">
                {precio_por_autor.map((item) => (
                  <div>
                    <div
                      className="flex items-center justify-between gap-4"
                      key={item._id}
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          src={item.userCreator.image}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <h3 className="text-base-medium">
                          {item.userCreator.firstName}{" "}
                          {item.userCreator.lastName}
                        </h3>
                      </div>
                      <span className="text-base-semibold text-red-700">
                        ${item.priceAmount}
                      </span>
                    </div>
                    <hr className="mt-4 border-slate-200" />
                  </div>
                ))}
              </div>
              <div id="total" className="flex flex-col items-center gap-1">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-base-light">Subtotal</h3>
                  <span className="text-base-semibold text-red-700">
                    $
                    {cartItems.reduce((acc, item) => acc + item.priceAmount, 0)}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-base-light">Descuentos</h3>
                  <span className="text-base-semibold text-red-700">$0</span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-base-semibold">Total</h3>
                  <span className="text-base-semibold text-red-700">
                    $
                    {cartItems.reduce((acc, item) => acc + item.priceAmount, 0)}
                  </span>
                </div>
              </div>
              <button
                className="text-base-semibold rounded-md bg-red-700 py-2 text-white"
                onClick={handlePayment}
              >
                Comprar
              </button>
            </IslandDashboard>
          </div>
        </Section>
        <BeatsRelatedSection title="Beats ">
          <span className="text-titulo2-semibold">relacionados</span>
        </BeatsRelatedSection>
      </Main>
    </>
  );
}
