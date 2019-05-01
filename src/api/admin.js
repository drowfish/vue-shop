import axios from '../config/axios-admin';

//管理员登录
export function login(data){
	const res = axios.post('/admin/login',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//获取所有用户信息
export function getAllUser(){
	const res = axios.get('/user/allUser');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//删除指定用户
export function deleteUser(id){
	const res = axios.get('/user/deleteUser?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//搜索用户
export function getSearchUser(val){
	const res = axios.get('/user/searchUser?word='+val);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//更改密码
export function changePwd(data){
	const res = axios.post('/admin/changePwd',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到未回复的信息
export function getNoReplyMsg(){
	const res = axios.get('/message/getNoReplyMsg');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到已回复的信息
export function getRepliedMsg(){
	const res = axios.get('/message/getRepliedMsg');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//回复
export function reply(data){
	const res = axios.post('/reply/replyMsg',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}
//改变信息状态
export function updateMessage(data){
  const res = axios.post('/message/updateMessage',data);
  return new Promise((resolve,reject)=>{
    res
      .then((result)=>{
        if(result.status===200){
          return result.data;
        }else{
          reject(result.status)
        }
      })
      .then((json)=>{
        if(json.state===1){
          resolve();
        }else{
          reject(json.message);
        }
      })
      .catch((e)=>{
        reject(e.toString())
      })
  })
}
//得到订单
export function getOrders(state){
	const res = axios.get('/order/getOrdersByAdmin?state='+state);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到订单
// export function getAOrder(id){
// 	const res = axios.get('/api/admin/order?id='+id);
// 	return new Promise((resolve,reject)=>{
// 		res
// 		.then((result)=>{
// 	        if(result.status===200){
// 	        	return result.data;
// 	        }else{
// 	        	reject(result.status)
// 	        }
// 	    })
// 	    .then((json)=>{
//     		if(json.state===1){
//                 resolve(json.data);
//             }else{
//                 reject(json.message);
//             }
//     	})
// 	    .catch((e)=>{
// 	    	reject(e.toString())
// 	    })
// 	})
// }

//修改订单
// export function changeOrder(data){
// 	const res = axios.post('/api/admin/changeOrder',data);
// 	return new Promise((resolve,reject)=>{
// 		res
// 		.then((result)=>{
// 	        if(result.status===200){
// 	        	return result.data;
// 	        }else{
// 	        	reject(result.status)
// 	        }
// 	    })
// 	    .then((json)=>{
//     		if(json.state===1){
//                 resolve();
//             }else{
//                 reject(json.message);
//             }
//     	})
// 	    .catch((e)=>{
// 	    	reject(e.toString())
// 	    })
// 	})
// }

//删除指定订单
export function deleteOrder(id){
	const res = axios.get('/order/deleteOrder?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到商品
export function getGoods(id){
	const res = axios.get('/goods/getGoodsByType?typeId='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到类目
export function getTypes(){
	const res = axios.get('/type/getType');
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//增加类目
export function addType(data){
	const res = axios.post('/type/addType',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//得到商品信息
export function getGoodsInfo(id){
	const res = axios.get('/goods/getGoodsInfo?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//增加商品
export function addGoods(data){
	const res = axios.post('/goods/addGoods',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//增加规格
export function addSpec(data){
	const res = axios.post('/goodsDetail/addSpec',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve(json.data);
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//删除规格
export function deleteSpec(data){
	const res = axios.post('/goodsDetail/deleteSpec',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//更新商品信息
export function updateGoods(data){
	const res = axios.post('/goods/updateGoods',data);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}

//删除指定商品
export function deleteGoods(id){
	const res = axios.get('/goods/deleteGoods?id='+id);
	return new Promise((resolve,reject)=>{
		res
		.then((result)=>{
	        if(result.status===200){
	        	return result.data;
	        }else{
	        	reject(result.status)
	        }
	    })
	    .then((json)=>{
    		if(json.state===1){
                resolve();
            }else{
                reject(json.message);
            }
    	})
	    .catch((e)=>{
	    	reject(e.toString())
	    })
	})
}
