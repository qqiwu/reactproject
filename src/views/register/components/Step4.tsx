import React, { FC, useState } from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { doFinishRegister } from '../../../api/user';
import { inject, observer } from 'mobx-react';
interface Step4Props {

};

const RegisterStep4: FC<any> = (props) => {
    console.log('Step4 props', props)
    const navigate = useNavigate()

    const [form] = Form.useForm();
    const [pwd, setPwd] = useState('');

    const onFinish = () => {
        const requestData = {
            tel: props.store.user.tel,
            password: pwd,
        };
        console.log('requestData', requestData)
        doFinishRegister(requestData).then((res) => {
            // 处理设置密码结果
            console.log('res', res)
            if (res.data.code == 200) {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 2000,
                })
                localStorage.clear()
                navigate('/login')
            }
        })
    }

    return (
        <>
            <Form
                layout='horizontal'
                form={form}
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='danger' size='large'>
                        下一步
                    </Button>
                }
            >
                <Form.Item name='telcode'>
                    <Input
                        placeholder='请设置您的密码'
                        clearable
                        value={pwd}
                        onChange={(value) => setPwd(value)}
                    />
                </Form.Item>
            </Form>
        </>
    )
};

export default inject('store')(observer(RegisterStep4));