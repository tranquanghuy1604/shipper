'use client';
import { useMutationOnDelivered, useQueryGetOrder } from '@/api/shipperApi';
import { Button, Card } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OrderDetailView() {
  const params = useParams();
  const { data } = useQueryGetOrder(params.orderId);
  const { mutate: delivered } = useMutationOnDelivered();
  const dataOrder = data as any;
  const router = useRouter();

  const handleDelivered = (orderId: any) => {
    delivered(
      { _id: orderId },
      {
        onSuccess: (data) => {
          toast.success('Giao hàng thành công');
          router.push('/');
        },
      },
    );
  };

  return (
    <div className='p-4'>
      <Card className='mb-4'>
        <div className='flex justify-between items-center'>
          <div>
            <div className=''>
              Khách hàng: <span className='font-semibold text-[20px]'>{dataOrder?.customer?.fullname}</span>
            </div>
            <div className='text-gray-500 mt-[10px]'>Địa chỉ: {dataOrder?.customer?.address}</div>
            <div className='text-gray-500 mt-[10px]'>Lấy hàng trước 17:25</div>
          </div>
        </div>
      </Card>

      <Card className='mb-4'>
        <div className=''>
          <div className='font-semibold'>Thanh toán</div>
        </div>
        <div className='text-red-500 text-xl font-bold'>-₫{Number(dataOrder?.total_price).toLocaleString('en-US')}</div>
        <div className='mt-2'>
          <div className='flex justify-between'>
            <div>Phương thức thanh toán</div>
            <div className='font-semibold'>Tiền mặt</div>
          </div>
          <div className='flex justify-between mt-1'>
            <div>Phí giao hàng</div>
            <div className='font-semibold'>₫{Number(dataOrder?.ship_code).toLocaleString('en-US')}</div>
          </div>
        </div>
      </Card>

      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200'>
        <Button onClick={() => handleDelivered(dataOrder?._id)} type='primary' className='w-full'>
          Đã lấy hàng
        </Button>
      </div>
    </div>
  );
}
