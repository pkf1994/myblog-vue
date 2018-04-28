import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations.js'
import actions from './actions.js'

var state = {
  isTimeToRefreshArticleDraftList:false,
  isTimeToShowModalOfClickDraftListItem:false
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
