'use client';
import { useQueryGetUser } from '@/api/authApi';
import { useMutationDelivering, useMutationGetAllOrder } from '@/api/shipperApi';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PoweroffOutlined } from '@ant-design/icons';

export default function HomeView() {
  const { data } = useQueryGetUser();
  const { mutate: listOrder } = useMutationGetAllOrder();
  const [listDataOrder, setListDataOrder] = useState<any>([]);
  const { mutate: delivering } = useMutationDelivering();
  const router = useRouter();
  const listUser = data as any;
  useEffect(() => {
    listOrder(
      { status: 'waiting-delivery' },
      {
        onSuccess: (data) => {
          setListDataOrder(data);
        },
      },
    );
  }, []);

  const handleConfirmOrder = (orderId: any) => {
    delivering(
      { _id: orderId, shipper_id: listUser?._id },
      {
        onSuccess: (data: any) => {
          toast.success('Nhận hàng thành công');
          router.push(`/${data.order._id}`);
        },
      },
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken-shipper');
    router.push('/login');
  };

  return (
    <div className='w-full'>
      <button onClick={handleLogout} className='flex justify-end w-full'>
        <PoweroffOutlined style={{ fontSize: '24px' }} />
      </button>
      <div className='mt-[30px] text-center'>
        <h1 className='text-xl font-bold'>Danh sách đơn hàng</h1>
      </div>
      {listDataOrder?.map((item: any, index: any) => (
        <div
          key={index}
          className='bg-white shadow-lg w-full max-w-sm mx-auto cursor-pointer mt-[20px] p-[10px] border-[1px] rounded-[16px]'
        >
          <div className='flex justify-between items-start'>
            {item.status === 'waiting-delivery' ? (
              <button className='px-2 py-1 bg-[#cccc] text-white rounded'>Đang tìm</button>
            ) : (
              <button className='px-2 py-1 bg-orange-500 text-white rounded'>Đã nhận</button>
            )}
            <div>
              <div className='flex justify-end gap-[10px] items-center'>
                <span>4,6 km</span>
                <span className='text-orange-500 font-semibold'>đ{item?.ship_code}</span>
              </div>
              <div className='flex justify-end gap-[10px] items-center mb-4'>
                <span>Thu hộ:</span>
                <span className='text-green-500 font-semibold'>
                  đ{item?.payment_method === 'offline' ? Number(item.total_price).toLocaleString('en-US') : 0}
                </span>
              </div>
            </div>
          </div>
          <div className='bg-white p-[10px] rounded-lg max-w-md mx-auto'>
            <div className='relative items-center grid grid-cols-6 w-full gap-[10px]'>
              <div className='col-span-1 grid grid-rows-6 h-full'>
                <div className='row-start-2 row-end-3 w-[20px] h-[20px] bg-orange-500 rounded-[10000px]'></div>
                <div className='row-start-4 row-end-5 w-[20px] h-[20px] bg-white border-[1px] border-gray-400 rounded-[10000px] mt-1.5'></div>
              </div>
              <div className='absolute h-[46px] w-[2px] bg-gray-400 top-[50px] left-[8px]'></div>
              <div className='grid grid-rows-6 col-start-2 col-end-7 h-full max-h-[250px]'>
                <div className='h-full max-h-[30px] row-start-1 row-end-2'>
                  <h2 className='font-semibold'>Táo đỏ</h2>
                </div>
                <div className='h-full max-h-[30px] row-start-2 row-end-3'>
                  <p className='font-semibold'>175 Tây Sơn, Hà Nội</p>
                </div>

                <div className='h-full max-h-[30px] row-start-4 row-end-5'>
                  <p>số 6 hoàng thế thiện, Phường Đằng Hải, Quận Hải An, Hải Phòng</p>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <Button
              disabled={item?.status !== 'waiting-delivery'}
              type='primary'
              onClick={() => handleConfirmOrder(item._id)}
            >
              Xác nhận đơn
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
