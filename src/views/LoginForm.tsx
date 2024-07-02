'use client';
import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useMutationLogin } from '@/api/authApi';
interface ValueLogin {
  email: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const { mutate: login } = useMutationLogin();

  const onFinish = (values: ValueLogin) => {
    login(
      { email: values.email, password: values.password },
      {
        onSuccess: (data: any) => {
          toast.success('Đăng nhập thành công');
          localStorage.setItem('authToken-shipper', data?.token);
          router.push('/');
        },
      },
    );

    console.log(values);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <Form name='normal_login' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button w-full'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
