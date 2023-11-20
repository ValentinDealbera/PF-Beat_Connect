import { toast } from 'sonner'
import i18next from 'i18next'

export const selectFilteredBeats = (state) => {
  const { searchFilter, genresFilter, typesFilter, priceFilter, BpmFilter, sorter } = state.filters
  const { publicItems, userFavoriteBeats, userPurchasedBeats, userOwnedBeats, activeItems, beatsDisplayMode } =
    state.beats

  if (
    (searchFilter === '' || searchFilter === undefined) &&
    (genresFilter.length === 0 || genresFilter === undefined) &&
    (priceFilter.min === 0 || priceFilter.min === undefined) &&
    (priceFilter.max === 0 || priceFilter.max === undefined) &&
    (BpmFilter.min === 0 || BpmFilter.min === undefined) &&
    (BpmFilter.max === 0 || BpmFilter.max === undefined) &&
    (sorter === 'default' || sorter === undefined || sorter === '' || sorter === null)
  ) {
    //   return activeItems;
    // } else {
    // }
    // if(beatsDisplayMode !== 0 ) {
    //   return activeItems;
    // }
    // let activeBeats = activeItems
    // if (activeBeats.length <= 0) {
    //   return activeBeats;
    // }
    // console.log("no hay filtros", sorter);
    // return activeItems;
  } else {
  }

  try {
    const beatFilters = {
      minBPM: BpmFilter.min,
      maxBPM: BpmFilter.max,
      minprice: priceFilter.min,
      maxPrice: priceFilter.max
    }

    if (sorter) {
      if (sorter === 'default') {
        beatFilters
      } else if (sorter === 'Price-AS') {
        beatFilters.priceAmount = 'asc'
      } else if (sorter === 'Price-DES') {
        beatFilters.priceAmount = 'desc'
      } else if (sorter === 'BPM-AS') {
        beatFilters.BPM = 'asc'
      } else if (sorter === 'BPM-DES') {
        beatFilters.BPM = 'desc'
      } else if (sorter === 'A-Z') {
        beatFilters.name = 'asc'
      } else if (sorter === 'Z-A') {
        beatFilters.name = 'desc'
      }
    }

    return beatFilters
  } catch (error) {
    console.log(error)
    let trad =
      i18next?.language == 'en' ? 'An error occurred, please reload the page.' : 'Ocurrio un error, recarga la pagina'
    toast.error(trad, {
      style: {
        background: '#FFF0F0',
        color: '#E60000'
      }
    })
    return activeItems
  }
}
