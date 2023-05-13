import React, { FC, useState, useMemo } from 'react';
import { Form, Input, Button, Toast, NavBar } from 'antd-mobile'
import { doLogin } from '../../api/user'
import { useNavigate, Link } from 'react-router-dom';
// 因为mobox内部声明了全局可观察 所以要用 observer观察 观察后inject注入数据
import { inject, observer } from 'mobx-react'
interface ILoginProps {

};

const Login: FC<any> = (props) => {
    console.log('props', props)
    const navigate = useNavigate()  // 编程式导航
    const [loginname, setLoginname] = useState('')
    const [password, setPassword] = useState('')

    const flag = useMemo(() => {
        return loginname === '' || password === ''
    }, [loginname, password])

    // input框输入的时候 事件信息自动进入
    const onValuesChange = (changeValues, allValues) => {
        console.log('changeValues', changeValues)
        console.log('allValues', allValues)
        if (allValues.loginname === undefined) {
            setPassword(allValues.password)
        } else if (allValues.password === undefined) {
            setLoginname(allValues.loginname)
        } else {
            setPassword(allValues.password)
            setLoginname(allValues.loginname)
        }
    }

    const onFinish = (values) => {
        console.log('准备登陆')
        console.log('values表单数据', values)
        doLogin(values).then((res) => {
            console.log('finished', res)
            if (res.data.code == 200) {
                console.log('登录成功,准备跳转')
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 1500
                })
                // 本地存储
                localStorage.setItem('loginState', String(true))
                localStorage.setItem('userid', res.data.data.userid)
                localStorage.setItem('username', res.data.data.username)
                localStorage.setItem('token', res.data.data.token)
                // 全局状态
                props.store.user.changeLoginState({ payload: true })
                props.store.user.changeUserId({ payload: res.data.data.userid })
                props.store.user.changeUserName({ payload: res.data.data.username })
                props.store.user.changeToken({ payload: res.data.data.token })

                navigate('/home')
            } else {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 1500
                })
            }
        })
    }

    return (
        <>
            <header className="header">
                <NavBar
                    style={{
                        '--height': '0.44rem',
                        '--border-bottom': '1px #eee solid',
                        color: '#fff'
                    }}
                    onBack={() => navigate(-1)}
                >
                    登录
                </NavBar>
            </header>
            <div className="content">
                <Form
                    layout='horizontal'
                    footer={
                        <Button block type='submit' color='danger' disabled={flag} size='large'>
                            登录
                        </Button>
                    }
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item name='loginname'>
                        <Input placeholder='手机号/用户名/邮箱' clearable />
                    </Form.Item>
                    <Form.Item name='password'>
                        <Input placeholder='密码' clearable type='password' />
                    </Form.Item>
                </Form>
                <Link to="/register">手机号快速注册</Link>
            </div>
        </>
    )
};

// export default Login;

// 把strore的数据,注入到观察的login页面(高阶函数)
export default inject('store')(observer(Login));