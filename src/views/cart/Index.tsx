import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { observer, inject } from 'mobx-react'
import { getCartListData, removeOneData, selectAllData, selectOneData, updateOneDataNum } from '../../api/cart';
import { Button, Empty, List, Image, Ellipsis, Stepper, SwipeAction, Modal, Checkbox, NavBar } from 'antd-mobile';
import { GiftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
interface IState {
  cartid: string
  discount: number
  flag: boolean
  img1: string
  num: number
  originprice: number
  proid: string
  proname: string
  userid: string
}
interface ICartProps {
};

const Cart: FC<ICartProps> = (props: any) => {
  const navigate = useNavigate()


  const [cartList, setCartList] = useState<IState[]>([])
  const [checked, setChecked] = useState(false)

  const getCartList = useCallback(() => {
    const userid = props.store.user.userid
    console.log('userid', userid)
    getCartListData({ userid: userid }).then(res => {
      console.log(res.data)
      if (res.data.code === '10020') {
        setCartList([])
      } else {
        setCartList(res.data.data)
        const val = res.data.data.every((item: IState) => item.flag)
        setChecked(val)
      }
    })
  }, [props.store.user.userid])

  useEffect(() => {
    getCartList()
  }, [getCartList])

  const empty = useMemo(() => { return cartList.length === 0 }, [cartList])

  const totalNum = useMemo(() => {
    return cartList.reduce((sum, item) => {
      return item.flag ? sum += item.num : sum += 0
    }, 0)
  }, [cartList])
  const totalPrice = useMemo(() => {
    return cartList.reduce((sum, item) => {
      return item.flag ? sum += item.num * item.originprice : sum += 0
    }, 0)
  }, [cartList])

  return (
    <>
      <header className="header">
        <NavBar
          style={{
            '--height': '0.44rem',
            '--border-bottom': '1px #eee solid',
            color: '#fff'
          }}
          onBack={() => navigate(-1)}
        >
          购物车
        </NavBar>
      </header>
      <div className="content">
        {
          empty ? <Empty
            style={{ padding: '64px 0' }}
            image={
              <GiftOutline
                style={{
                  color: 'var(--adm-color-light)',
                  fontSize: 100,
                }}
              />
            }
            description={
              <>
                <p>购物车空空如也</p>
                <Button
                  color="danger"
                  style={{ marginTop: 30 }}
                  onClick={() => navigate('/kind')}
                >立即购物</Button>
              </>
            }
          />
            : <List >
              {
                cartList && cartList.map(item => {
                  return (
                    <SwipeAction
                      key={item.cartid}
                      rightActions={[
                        {
                          key: 'delete',
                          text: '删除',
                          color: 'danger',
                          onClick: () => {
                            Modal.confirm({
                              content: <div>确定删除吗</div>,
                              confirmText: '删除',
                              onConfirm: () => {
                                removeOneData({ cartid: item.cartid }).then(() => {
                                  getCartList()
                                })
                              }
                            })

                          }
                        },
                      ]}
                    >
                      <List.Item

                        prefix={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div onClick={e => {
                              e.stopPropagation()
                              selectOneData({ cartid: item.cartid, flag: !item.flag }).then(() => {
                                getCartList()
                              })
                            }}>
                              <Checkbox checked={item.flag} />
                            </div>
                            <Image
                              src={item.img1}
                              style={{ borderRadius: 20 }}
                              fit='cover'
                              width={80}
                              height={80}
                            />
                          </div>
                        }
                        description={
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{item.originprice}</span>
                            <Stepper digits={0} value={item.num} onChange={(value) => {
                              console.log(value)
                              updateOneDataNum({ cartid: item.cartid, num: value }).then(() => {
                                getCartList()
                              })
                            }} />
                          </div>
                        }
                      >
                        <Ellipsis direction='end' rows={2} content={item.proname} />
                      </List.Item>
                    </SwipeAction>
                  )
                })
              }
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '0.5rem',
                backgroundColor: '#efefef',
                bottom: 0,
                display: 'flex'
              }}>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginLeft: 10
                }}
                  onClick={() => {
                    console.log(1)
                    selectAllData({ userid: props.store.user.userid, type: !checked }).then(() => {
                      getCartList()
                      setChecked(!checked)
                    })
                  }}
                >
                  <Checkbox checked={checked}>全选</Checkbox>
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'start'
                }}>
                  <p>总价: <span style={{ color: '#f66' }}>{totalPrice}</span></p>
                  <p>共计<span style={{ color: '#f66' }}>{totalNum}</span>件商品</p>
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Button color='danger' size='small'>提交订单</Button>
                </div>
              </div>
            </List>

        }
      </div>
    </>
  )
};
// Cart 单独组件
// observer(Cart) // 将组件设置为观察者
// inject('store')(observer(Cart)) // 给组件提供状态，后代组件获取到祖先组件的状态
export default inject('store')(observer(Cart))