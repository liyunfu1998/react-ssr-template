import { hydrateRoot } from "react-dom/client";
import router from '@/router'
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Client = ():JSX.Element =>{
  return (
    <BrowserRouter>
      <Routes>
        {router?.map((item,index)=>{
          return <Route key={index} {...item} />
        })}
      </Routes>
    </BrowserRouter>
  )
}

hydrateRoot(document.getElementById("root") as Document | Element, <Client />);
