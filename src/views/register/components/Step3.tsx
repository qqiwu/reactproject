import React, { FC, useState } from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { doCheckCode } from '../../../api/user';
import { inject, observer } from 'mobx-react';

interface IRegisterStep3Props { }

const RegisterStep3: FC<any> = (props) => {
    console.log('props', props);
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [telcode, setTelCode] = useState('');

    const onFinish = () => {
        const requestData = {
            tel: props.store.user.tel,
            telcode: telcode,
        };

        console.log('requestData', requestData);

        doCheckCode(requestData).then((res) => {
            // 处理验证码发送结果
            console.log('res', res);
            if (res.data.code == 10007) {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 2000,
                })
            } else if (res.data.code == 200) {
                Toast.show({
                    content: res.data.message,
                    position: 'bottom',
                    duration: 2000,
                })
                setTimeout(() => {
                    Toast.show({
                        content: res.data.data,
                        position: 'bottom',
                        duration: 8000,
                    });
                    navigate('/register/step4');
                }, 2000)
            }

            // 导航到下一步
            // navigate('/register/step4');
        });
    };

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
                        placeholder='请输入验证码'
                        clearable
                        value={telcode}
                        onChange={(value) => setTelCode(value)}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default inject('store')(observer(RegisterStep3));
