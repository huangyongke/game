import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pay from '@/components/Pay'
import Paysuccess from '@/components/Paysuccess'
import Buy from '@/components/Buy'
import Sell from '@/components/Sell'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
import Profile from '@/components/Profile'
import User from '@/components/User'
import Manage from '@/components/Manage'
import Buy_manage from '@/components/Buy_manage'
import Registration from '@/components/Registration'
import Forget from '@/components/Forget'
import ModifyPassword from '@/components/ModifyPassword'
import PersonalBuy from '@/components/PersonalBuy'
import PersonalSell from '@/components/PersonalSell'
import UserManage from '@/components/UserManage'
import Species from '@/components/Species'
import StaySell from '@/components/StaySell'
import StayBuy from '@/components/StayBuy'
import SellRecord from '@/components/SellRecord'
import BuyRecord from '@/components/BuyRecord'
import AllGames from '@/components/AllGames'
import NotFind from '@/components/NotFind'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      component: Home
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: Paysuccess
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: [  //这里就是二级路由的配置
        {
          path: 'modifyPassword',
          name: 'modifyPassword',
          component: ModifyPassword
        },
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'personalBuy',
          name: 'personalBuy',
          component: PersonalBuy
        },
        {
          path: 'personalSell',
          name: 'personalSell',
          component: PersonalSell
        },
        {
          path: 'userManage',
          name: 'userManage',
          component: UserManage
        },
        {
          path: 'buy_manage',
          name: 'buy_manage',
          component: Buy_manage
        },
        {
          path: 'species',
          name: 'species',
          component: Species
        },
        {
          path: 'staySell',
          name: 'staySell',
          component: StaySell
        },
        {
          path: 'stayBuy',
          name: 'stayBuy',
          component: StayBuy
        },
        {
          path: 'sellRecord',
          name: 'sellRecord',
          component: SellRecord
        },
        {
          path: 'buyRecord',
          name: 'buyRecord',
          component: BuyRecord
        },
        {
          path: 'allGames',
          name: 'allGames',
          component: AllGames
        },
      ]
    },
    {
      path: '*',
      name: 'notFind',
      component: NotFind
    },
    
  ]
})
