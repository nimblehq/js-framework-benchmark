import type { AppNextPage } from 'pages/_app';

const Home: AppNextPage = () => {
  return (
    <>
      <div>JS Framework Benchmark</div>
    </>
  );
};

Home.authRequired = true;

export default Home;
