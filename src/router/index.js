import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import mainPage from '@/components/mainPage'
import searchPage from '@/components/searchPage'
import listTemplet from '@/components/listTemplet'
import showMusic from '@/components/showMusic'
import mineMusic from '@/components/mineMusic'
import selectSong from '@/components/selectSong'
import mineMusicList from '@/components/mineMusicList'
import moreList from '@/components/moreList'
import MVPage from '@/components/MVPage'
import singerInfo from '@/components/singerInfo'
import albumPage from '@/components/albumPage'
import searchResult from '@/components/searchResult'
import musicPlayPage from '@/components/musicPlayPage'
import albumShow from '@/components/albumShow'
import albumResult from '@/components/base/search/albumResult'
import MVResult from '@/components/base/search/MVResult'
import songResult from '@/components/base/search/songResult'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/homePage', component: homePage},
    {
      path: '/mainPage',
      component: mainPage,
      children: [
        {path: 'showMusic', component:showMusic},
        {path: 'mineMusic', component:mineMusic}
      ]
    },
    {path: '/searchPage', component: searchPage},
    {path: '/searchPage', component: searchPage},
    {path: '/listTemplet/:clasify', component: listTemplet},
    {path: '/selectSong', component: selectSong, name:'selectSong'},
    {path: '/mineMusicList', component: mineMusicList},
    {path: '/moreList/:type', component: moreList},
    {path: '/MVPage/:n', component: MVPage},
    {path: '/albumPage', component: albumPage},
    {path: '/singerInfo', component: singerInfo},
    {path: '/musicPlayPage', component: musicPlayPage},
    {path: '/albumShow', component: albumShow},
    {
      path: '/searchResult',
      component: searchResult,
      children: [
        {path: 'songResult', component:songResult, name:'songResult'},
        {path: 'MVResult', component:MVResult, name:'MVResult'},
        {path: 'albumResult', component:albumResult, name:'albumResult'},
        {path: '/', redirect:'/searchResult/songResult'},
      ]
    },
    {path: '*', component: homePage}
  ]
})
