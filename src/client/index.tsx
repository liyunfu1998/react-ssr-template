import { hydrateRoot } from "react-dom/client";
import router from '@/router'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Provider} from 'react-redux'
import store from '@/stores/clientStore'

const Client = ():JSX.Element =>{
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {router?.map((item,index)=>{
          return <Route key={index} {...item} />
        })}
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

hydrateRoot(document.getElementById("root") as Document | Element, <Client />);
