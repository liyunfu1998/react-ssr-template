import { FC } from "react";
const Home: FC = () => {
  return (
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
  );
};

export default Home;
