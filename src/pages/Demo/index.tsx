import {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addNewPost } from "@/stores/demoSlice";
const Demo:FC=()=>{
  const dispatch = useDispatch()
  const demo = useSelector((state:any)=>state.demo.content)

  
  const onFetchClick =async ()=>{
    try{
      await dispatch(addNewPost() as any).unwrap();
    }catch(e){
      console.log('请求失败',e)
    }
  }

  return (
    <div>
      <h1>数据：{demo}</h1>
      <button onClick={()=>onFetchClick()}>获取数据</button>
    </div>
  )
}

export default Demo