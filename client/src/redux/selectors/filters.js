import { toast } from "sonner";

export const selectFilteredBeats = (state) => {
  const { searchFilter, genresFilter, typesFilter } = state.filters;
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
    (typesFilter.length === 0 || typesFilter === undefined)
  ) {
    console.log("no hay filtros");
    return activeItems;
  } else {
    console.log("hay filtros");
  }

  let activeBeats = activeItems;

  let filteredBeats = [];

  if (searchFilter) {
    activeBeats = activeBeats.filter((beat) => {
      return beat.name.toLowerCase().includes(searchFilter.toLowerCase());
    });
  }

  // Filtrar por géneros
  if (genresFilter.length > 0) {
    activeBeats = activeBeats.filter((beat) => {
      return beat.genres.some((genre) => genresFilter.includes(genre));
    });
  }

  // Filtrar por tipos
  if (typesFilter.length > 0) {
    activeBeats = activeBeats.filter((beat) => {
      return beat.types.some((genre) => typesFilter.includes(genre));
    });
  }

  filteredBeats = activeBeats;

  console.log(
    "filteredBeats",
    filteredBeats,
    filteredBeats.length,
    typeof filteredBeats
  );
  if (filteredBeats.length > 0) {
    console.log("hay beats que mostrar");
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
};
