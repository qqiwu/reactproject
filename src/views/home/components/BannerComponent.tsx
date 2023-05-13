import React, { FC } from 'react';
import {Image,Swiper} from 'antd-mobile'
interface IBannerComponentProps {
  
};

const BannerComponent:FC<any> = ({list}) => {
  return (
     <div style={{padding:'15px'}}>
        <Swiper autoplay loop={true} style={{
              '--border-radius': '8px',
        }}>
            {
                list &&  list.map((item)=>{
                    return (
                        <Swiper.Item key={item}>
                            <Image src={item}/>
                        </Swiper.Item>
                    )
                })
            }
        </Swiper>
     </div>
  )
};

export default BannerComponent;