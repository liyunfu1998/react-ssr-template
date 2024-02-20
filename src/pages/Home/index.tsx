import { FC } from "react";
import {Helmet} from 'react-helmet'

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>简易的服务器端渲染 - HOME</title>
        <meta name="description" content="简易的服务器端渲染 - HOME" />
      </Helmet>
      <div>
        <h1>hello-ssr</h1>
        <button
          onClick={(): void => {
            alert("hello-ssr");
          }}
        >
          alert
        </button>
      </div>
    </>
  );
};

export default Home;
