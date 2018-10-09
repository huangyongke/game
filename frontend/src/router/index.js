import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/components/Home'
//import Pay from '@/components/Pay'
//import Paysuccess from '@/components/Paysuccess'
//import Buy from '@/components/Buy'
//import Sell from '@/components/Sell'
//import Login from '@/components/Login'
//import Reg from '@/components/Reg'
//import Profile from '@/components/Profile'
//import User from '@/components/User'
//import Manage from '@/components/Manage'
//import Buy_manage from '@/components/Buy_manage'
//import Registration from '@/components/Registration'
//import Forget from '@/components/Forget'
//import ModifyPassword from '@/components/ModifyPassword'
//import PersonalBuy from '@/components/PersonalBuy'
//import PersonalSell from '@/components/PersonalSell'
//import UserManage from '@/components/UserManage'
//import Species from '@/components/Species'
//import StaySell from '@/components/StaySell'
//import StayBuy from '@/components/StayBuy'
//import SellRecord from '@/components/SellRecord'
//import BuyRecord from '@/components/BuyRecord'
//import AllGames from '@/components/AllGames'
//import NotFind from '@/components/NotFind'
//import About from '@/components/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/Home'],resolve)
    },
    {
      path: '/buy',
      name: 'buy',
      component: resolve => require(['@/components/Buy'],resolve)
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['@/components/Pay'],resolve)
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: resolve => require(['@/components/Paysuccess'],resolve)
    },
    {
      path: '/sell',
      name: 'sell',
      component: resolve => require(['@/components/Sell'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/Login'],resolve)
    },
    {
      path: '/reg',
      name: 'reg',
      component: resolve => require(['@/components/Reg'],resolve),
    },
    {
      path: '/registration',
      name: 'registration',
      component: resolve => require(['@/components/Registration'],resolve),
    },
    {
      path: '/forget',
      name: 'forget',
      component: resolve => require(['@/components/Forget'],resolve),
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/components/about'],resolve),
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: resolve => require(['@/components/Profile'],resolve),
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['@/components/Manage'],resolve),
      children: [  //这里就是二级路由的配置
        {
          path: 'modifyPassword',
          name: 'modifyPassword',
          component: resolve => require(['@/components/ModifyPassword'],resolve),
//          component: ModifyPassword
        },
        {
          path: 'user',
          name: 'user',
          component: resolve => require(['@/components/User'],resolve),
        },
        {
          path: 'personalBuy',
          name: 'personalBuy',
          component: resolve => require(['@/components/PersonalBuy'],resolve),
        },
        {
          path: 'personalSell',
          name: 'personalSell',
          component: resolve => require(['@/components/PersonalSell'],resolve),
        },
        {
          path: 'userManage',
          name: 'userManage',
          component: resolve => require(['@/components/UserManage'],resolve),
        },
        {
          path: 'buy_manage',
          name: 'buy_manage',
          component: resolve => require(['@/components/Buy_manage'],resolve),
        },
        {
          path: 'species',
          name: 'species',
          component:  resolve => require(['@/components/Species'],resolve),
        },
        {
          path: 'staySell',
          name: 'staySell',
          component:  resolve => require(['@/components/StaySell'],resolve),
        },
        {
          path: 'stayBuy',
          name: 'stayBuy',
          component:  resolve => require(['@/components/StayBuy'],resolve),
        },
        {
          path: 'sellRecord',
          name: 'sellRecord',
          component:  resolve => require(['@/components/SellRecord'],resolve),
        },
        {
          path: 'buyRecord',
          name: 'buyRecord',
          component:  resolve => require(['@/components/BuyRecord'],resolve),
        },
        {
          path: 'allGames',
          name: 'allGames',
          component:  resolve => require(['@/components/AllGames'],resolve),
        },
      ]
    },
    {
      path: '*',
      name: 'notFind',
      component:  resolve => require(['@/components/NotFind'],resolve),
    },
    
  ]
})
