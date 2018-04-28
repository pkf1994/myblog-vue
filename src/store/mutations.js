export default {
  changeIsTimeToRefreshArticleDraftList(state){
    state.isTimeToRefreshArticleDraftList = !(state.isTimeToRefreshArticleDraftList);
  },
  changeIsTimeToShowModalOfClickDraftListItem(state){
    state.isTimeToShowModalOfClickDraftListItem = !(state.isTimeToShowModalOfClickDraftListItem);
  }
}
