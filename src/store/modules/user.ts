import { makeAutoObservable } from 'mobx'  // 自动化Observer


class UserStore {
    // 定义user模块化的初始化状态
    loginState: boolean = Boolean(localStorage.getItem('loginState'))
    userid: string = localStorage.getItem('userid') || ''
    username: string = localStorage.getItem('username') || ''
    token: string = localStorage.getItem('token') || ''
    tel: string = localStorage.getItem('tel') || ''

    constructor() {
        makeAutoObservable(this)  // 让当前的类 设置成全局可自动观察的
    }

    // 修改状态
    changeLoginState(action: any) {
        this.loginState = action.payload
    }

    // 修改/存储用户id
    changeUserId(action: any) {
        this.userid = action.payload
    }

    // 修改/存储用户名
    changeUserName(action: any) {
        this.username = action.payload
    }

    // 修改/存储用户token
    changeToken(action: any) {
        this.token = action.payload
    }

    // 修改/存储用户电话
    changeTel(action: any) {
        this.tel = action.payload
    }

}

export default UserStore;