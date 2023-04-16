import { toast } from "sonner";

export const selectFilteredBeats = (state) => {
  const {
    searchFilter,
    genresFilter,
    typesFilter,
    priceFilter,
    BpmFilter,
    sorter,
  } = state.filters;
  const {
    publicItems,
    userFavoriteBeats,
    userPurchasedBeats,
    userOwnedBeats,
    activeItems,
    beatsDisplayMode,
  } = state.beats;

  if (
    (searchFilter === "" || searchFilter === undefined) &&
    (genresFilter.length === 0 || genresFilter === undefined) &&
    (priceFilter.min === 0 || priceFilter.min === undefined) &&
    (priceFilter.max === 0 || priceFilter.max === undefined) &&
    (BpmFilter.min === 0 || BpmFilter.min === undefined) &&
    (BpmFilter.max === 0 || BpmFilter.max === undefined) &&
    (sorter === "default" || sorter === undefined || sorter === "" || sorter === null) 
  ) {
    console.log("no hay filtros", sorter);
    return activeItems;
  } else {
    console.log("hay filtros", sorter, priceFilter, BpmFilter, genresFilter, typesFilter, searchFilter, beatsDisplayMode );
  }

  if(beatsDisplayMode !== 0 ) {
    return activeItems;
  }
  let activeBeats = activeItems 
console.log("activeBeats", activeBeats);
  if (activeBeats.length <= 0) {
    return activeBeats;
  }
 

  let filteredBeats = [];

  try {
    if (searchFilter) {
      activeBeats = activeBeats.filter((beat) => {
        return beat.name.toLowerCase().includes(searchFilter.toLowerCase());
      });
    }

console.log("activeBeats paso 1", activeBeats);

    // Filtrar por géneros
    if (genresFilter.length > 0) {
      activeBeats = activeBeats.filter((obj) => {
        return genresFilter.some((term) => {
          return obj.genre._id.includes(term);
        });
      });
    }

    console.log("activeBeats paso 2", activeBeats);

    //Cramos un filtro para precio maximo y minimo
    if (priceFilter) {
      if(priceFilter.max === 0) return;
      activeBeats = activeBeats.filter((beat) => {
        return (
          parseInt(beat.priceAmount) >= parseInt(priceFilter.min) &&
          parseInt(beat.priceAmount) <= parseInt(priceFilter.max)
        );
      });
    }

    console.log("activeBeats paso 3", activeBeats);

    //Cramos un filtro para BPM maximo y minimo
    if (BpmFilter) {
      if(BpmFilter.max === 0) return;
      activeBeats = activeBeats.filter((beat) => {
        return (
          parseInt(beat.BPM) >= parseInt(BpmFilter.min) &&
          parseInt(beat.BPM) <= parseInt(BpmFilter.max)
        );
      });
    }

    console.log("activeBeats paso 4", activeBeats);

    //Hacemos sort segun lo que el usuario elija, dejamos el default para lo ultimo en el if
    if (sorter) {
      if (sorter === "default") {
        return activeBeats;
      } else if (sorter === "Price-AS") {
        activeBeats.sort((a, b) => {
          return a.priceAmount - b.priceAmount;
        });
      } else if (sorter === "Price-DES") {
        activeBeats.sort((a, b) => {
          return b.priceAmount - a.priceAmount;
        });
      } else if (sorter === "BPM-AS") {
        activeBeats.sort((a, b) => {
          return a.BPM - b.BPM;
        });
      } else if (sorter === "BPM-DES") {
        activeBeats.sort((a, b) => {
          return b.BPM - a.BPM;
        });
      } else if (sorter === "A-Z") {
        activeBeats.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (sorter === "Z-A") {
        activeBeats.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
    }

    filteredBeats = activeBeats;

    if (filteredBeats.length > 0) {
      console.log("Hay beats que mostrar", filteredBeats);
      return filteredBeats;
    } else {
      console.log("No hay beats que mostrar", filteredBeats);
      toast.error("No hay beats que mostrar", {
        style: {
          background: "#FFF0F0",
          color: "#E60000",
        },
      });
      return activeItems;
    }
  } catch (error) {
    console.log(error);
    toast.error("Ocurrio un error, recarga la pagina", {
      style: {
        background: "#FFF0F0",
        color: "#E60000",
      },
    });
    return activeItems;
  }
};
