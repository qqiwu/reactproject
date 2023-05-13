import React, { FC, useMemo, useState } from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { doSendMsgCode } from '../../../api/user';
// 因为mobox内部声明了全局可观察 所以要用 observer观察 观察后inject注入数据
import { inject, observer } from 'mobx-react'
interface Step2Props {

};


const RegisterStep2: FC<any> = (props) => {

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loginname, setLoginname] = useState('');

    const flag = useMemo(() => {
        return loginname === '';
    }, [loginname]);

    const onValuesChange = (changedValues, allValues) => {
        const { loginname } = changedValues;
        if (loginname !== undefined) {
            setLoginname(loginname);
        }
    };

    const onFinish = (values) => {
        const { loginname } = values;
        const requestData = { tel: loginname }; // 重命名为 `tel`

        console.log('requestData', requestData);

        doSendMsgCode(requestData).then((res) => {
            console.log('res', res);
            if (res.data.code == 200) {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 2000,
                });
                console.log('res.data.tel', res.data.tel)
                localStorage.setItem('tel', res.data.tel)
                props.store.user.changeTel({ payload: res.data.tel })
                setTimeout(() => {
                    Toast.show({
                        content: res.data.data,
                        position: 'bottom',
                        duration: 8000,
                    });
                    navigate('/register/step3');
                }, 2000)
            }
        });
    };


    return (
        <>
            <Form
                layout='horizontal'
                form={form}
                footer={
                    <Button block type='submit' color='danger' disabled={flag} size='large'>
                        下一步
                    </Button>
                }
                onValuesChange={onValuesChange}
                onFinish={onFinish}
            >
                <Form.Item name='loginname'>
                    <Input placeholder='手机号/用户名/邮箱 获取验证码' clearable />
                </Form.Item>
            </Form>
        </>
    )
};

// export default RegisterStep2;

export default inject('store')(observer(RegisterStep2));