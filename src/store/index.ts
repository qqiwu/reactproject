import { makeAutoObservable } from 'mobx'

import UserStore from './modules/user'


class Store {
    user
    constructor() {
        // 让当前的类 全局可观察生效
        makeAutoObservable(this)
        this.user = new UserStore()
    }
}

const store = new Store()

export default store