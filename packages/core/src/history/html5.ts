export type HistoryLocation = string

export function createWebHistory(){
  const { history, location } = window

  function changeLocation(
    to:HistoryLocation,
    state:{},
    replace:boolean = false
  ):void{
    const url = to
    history[replace?'replaceState':'pushState'](state,'',url)
  }
}