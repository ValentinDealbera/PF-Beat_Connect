import Image from "next/image";

export const rowsBuilder = (
  beatsFiltered: any,
  t: any,
  montoVar: any,
  operacionVar: any,
  fechaVar: any
) => {
  return beatsFiltered.map((item: any) => {
    return {
      beat: (
        <div className="flex items-center gap-4 ">
          <Image
            src={item.beat.image}
            width={70}
            height={70}
            className="aspect-square rounded-xl object-cover"
            alt="beat"
          />
          <div className="flex flex-col">
            <h3 className="text-base-medium">{item.beat.name}</h3>
            <p className="text-sm-light">
              {item.beat.userCreator.firstName} {item.beat.userCreator.lastName}
            </p>
          </div>
        </div>
      ),
      [montoVar]: <p className="text-sm-medium">${item.beat.priceAmount}</p>,
      [operacionVar]: (
        <p className="text-sm-medium">
          {item.operationType === "Compra"
            ? t("billing.compra")
            : t("billing.venta")}
        </p>
      ),
      [fechaVar]: <p className="text-sm-medium">{item.date}</p>,
    };
  });
};
