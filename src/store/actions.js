export default {
  saveArticleDraftSuccessful({commit}){
    commit('changeIsTimeToRefreshArticleDraftList');
  },
  clickArticleDraftList({commit}){
    commit('changeIsTimeToShowModalOfClickDraftListItem');
  }
}
