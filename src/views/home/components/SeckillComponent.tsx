import React, { FC, useEffect, useState } from 'react';
import { Image } from 'antd-mobile';
import './Seckill.scss';

interface IPro {
  banners: string[];
  brand: string;
  category: string;
  desc: string;
  discount: number;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  isrecommend: number;
  issale: number;
  isseckill: number;
  originprice: number;
  proid: string;
  proname: string;
  sales: number;
  stock: number;
}

interface ISeckillComponentProps {
  list: IPro[];
}

const SeckillComponent: FC<ISeckillComponentProps> = ({ list }) => {
  const [field] = useState(10);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date()); // 更新时间字段为当前时间
    }, 1000);

    // 清除计时器
    return () => clearInterval(timer);
  }, []); // 空依赖数组表示只在组件加载时执行一次

  // 计算剩余时间
  const calculateTimeLeft = () => {
    const targetTime = new Date(); // 设置目标时间
    targetTime.setHours(field, 0, 0, 0); // 将目标时间设置为当天的指定小时
    targetTime.setDate(targetTime.getDate() + 1); // 将目标时间设置为明天的指定小时

    const timeDifference = targetTime.getTime() - time.getTime();
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = calculateTimeLeft();

  return (
    <div className="seckillBox">
      <div className="title_wrap">
        <ul>
          <li>
            <span>嗨购秒杀</span>
            <span>{field}点场</span>
            <div className="myTimer">
              <span className="block">{hours}</span>
              <span className="colon">:</span>
              <span className="block">{minutes}</span>
              <span className="colon">:</span>
              <span className="block">{seconds}</span>
            </div>
          </li>
          <li>爆款轮番秒</li>
        </ul>
      </div>
      <ul className="seckillList">
        {list &&
          list.map((item) => (
            <li key={item.proid}>
              <Image src={item.img1} />
              <p>￥{item.originprice}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SeckillComponent;
