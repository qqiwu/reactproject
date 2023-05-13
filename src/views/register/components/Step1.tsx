import React, { FC, useMemo, useState } from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { doCheckPhone } from '../../../api/user';

interface Step1Props { }

const RegisterStep1: FC<any> = () => {
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

        doCheckPhone(requestData).then((res) => {
            console.log('res', res);
            if (res.data.code == 10005) {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 2000,
                });
            } else if (res.data.code == 200) {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 2000,
                });
                setTimeout(() => {
                    navigate('/register/step2');
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
                    <Input placeholder='手机号/用户名/邮箱' clearable />
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterStep1;


// export default inject('store')(observer(RegisterStep1));