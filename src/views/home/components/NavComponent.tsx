import React, { FC } from 'react';
import {Image,Swiper,Grid} from 'antd-mobile'


interface Inav {
    navid:number
    title:string 
    imgurl:string
}

interface InavComponentProps {
  list:Inav[]
};

const BannerComponent:FC<InavComponentProps> = ({list}) => {
  return (
      <Grid columns={5} gap={0}>
         {
            list && list.map((item)=>{
                return (
                    <Grid.Item
                        key={item.navid}
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Image src={item.imgurl} style={{width:44,height:44}}/>
                         <p>{item.title}</p>
                    </Grid.Item>
                )
            })
         }
      </Grid>
  )
};

export default BannerComponent;