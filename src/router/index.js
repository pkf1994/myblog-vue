import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import mainArea from '../components/mainArea.vue';
import search from '../components/search.vue';
import hotSpot from '../components/hotspot.vue';
import aboutMe from '../components/aboutme.vue';
import contactMe from '../components/contactMe.vue';
import articleDetails from '../components/articleDetails.vue';
import articleEditPane from '../components/articleEditPane.vue';
import articleDraftList from '../components/articleDraftList.vue'
import articleSubmitSuccessful from '../components/articleSubmitSuccessful.vue';
export default new VueRouter({

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/articles'
    },

    {
      path: '/articles',
      components: {
        mainArea: mainArea,
        search: search,
        hotSpot: hotSpot
      }
    },

    {
      path: '/aboutme',
      components: {
        aboutMe: aboutMe,
        contactMe: contactMe
      }
    },

    {
      path: '/article_details/:article_id',
      components:　{
        articleDetails: articleDetails
      },
      props:{
        articleDetails:true
      }
    },

    {
      name: 'write_article',
      path: '/write_article/:currentEditArticleId',
      components:　{
        articleEditPane: articleEditPane,
        articleDraftList: articleDraftList
      },
      props:{
        articleEditPane:true
      }
    },

    {
      path: '/article_submit_successful',
      components:{
        articleSubmitSuccessful:articleSubmitSuccessful
      }
    }

  ]
})
