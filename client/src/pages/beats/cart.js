import {
  Main,
  Section,
  IslandDashboard,
  DynamicTable,
  BeatsRelatedSection,
  Head,
} from "@/components";

import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "@/redux/slices/cart";
import { serverUrl } from "@/data/config";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

export default function Carrito() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart.cart) || [];
  const user = useSelector(
    (state) => state.client.authSession.session.current._id
  );

  const { isLogged } =
    useSelector((state) => state.client.authSession.auth) || false;

  const precio_por_autor = [];

  cartItems.forEach((item) => {
    const authorId = item.beat.userCreator._id
      ? item.beat.userCreator._id
      : item.beat.userCreator;
    const author = item.beat.userCreator.firstName
      ? `${item.beat.userCreator.firstName} ${item.beat.userCreator.lastName}`
      : item.beat.userCreator;
    const price = item.beat.priceAmount;
    const image = item.beat.userCreator.image;
    const index = precio_por_autor.findIndex(
      (obj) => obj.authorId === authorId
    );
    if (index === -1) {
      precio_por_autor.push({ authorId, author, price, image });
    } else {
      precio_por_autor[index].price += price;
    }
  });

  const headers = ["Item", "Price", "Author", "Action"];

  const rows = cartItems.map((item) => {
    return {
      id: item.beat._id,
      item: (
        <div className="flex items-center gap-4">
          <Image
            src={item.beat.image}
            width={50}
            height={50}
            className="aspect-square rounded-full"
          />
          <h3 className="text-base-medium">{item.beat.name}</h3>
        </div>
      ),
      price: item.beat.priceAmount,
      author: `${item.beat.userCreator.firstName} ${item.beat.userCreator.lastName}`,
      action: (
        <button onClick={() => dispatch(deleteFromCart({ id: item.beat._id }))}>
          Eliminar
        </button>
      ),
    };
  });

  const idsOfSellers = precio_por_autor.map((item) => item.authorId);
  const idsOfBuyer = user;

  const cartIds = cartItems.map((item) => item.beat._id);

  const toPay = {
    cart: cartIds,
    seller: idsOfSellers[0],
    buyer: idsOfBuyer,
  };

  const handlePayment = () => {
    console.log("pagar");
    console.log(toPay);
    if (!isLogged) {
      return alert("Debes iniciar sesion para poder comprar");
    }

    axios
      .post(`${serverUrl}cart/pay`, toPay, {
        headers: {
          "Content-Type": "application/json",
          userid: user,
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
      <Head title="Carrito" />
      <Main mode="transparent">
        <Section
          subClassName="padding-x-estilo2 pt-[108px]  pb-[10px] relative "
          className=""
        >
          <div 
           style={{backgroundImage: "url(/images/cartbg.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", zIndex: "-1"}}
           className="absolute min-h-[80%] w-full top-0 left-0 ">
          </div>

          <div className="flex flex-row gap-4 pt-10">
            <IslandDashboard className="flex w-full flex-col gap-4 h-max"
            style={{boxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.08)"}}
            >
              <h1 className="text-titulo2-medium">Carrito</h1>
              <DynamicTable headers={headers} rows={rows} />
            </IslandDashboard>
            <IslandDashboard className="flex w-[40%] flex-col gap-4"
            style={{boxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.08)"}}
            >
              <h2 className="text-subtitulo-medium">Tu orden</h2>
              <div id="precio_por_autor" className="flex flex-col gap-4">
                {precio_por_autor.map((item) => (
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <h3 className="text-base-medium">{item.author}</h3>
                      </div>
                      <span className="text-base-semibold text-red-700">
                        ${item.price}
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
                    {cartItems.reduce(
                      (acc, item) => acc + item.beat.priceAmount,
                      0
                    )}
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
                    {cartItems.reduce(
                      (acc, item) => acc + item.beat.priceAmount,
                      0
                    )}
                  </span>
                </div>
              </div>
              <button
                className="text-base-semibold rounded-full bg-red-700 py-2 text-white"
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
