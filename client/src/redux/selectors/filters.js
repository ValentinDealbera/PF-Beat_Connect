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
   
    return activeItems;
  } else {
    
  }

  if(beatsDisplayMode !== 0 ) {
    return activeItems;
  }
  let activeBeats = activeItems 

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



    // Filtrar por géneros
    if (genresFilter.length > 0) {
      activeBeats = activeBeats.filter((obj) => {
        return genresFilter.some((term) => {
          return obj.genre._id.includes(term);
        });
      });
    }



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

      return filteredBeats;
    } else {
 
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
