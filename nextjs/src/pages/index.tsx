import type { AppNextPage } from './_app';

const Home: AppNextPage = () => {
  return (
    <>
      <div>JS Framework Benchmark</div>
    </>
  );
};

Home.authRequired = true;

export default Home;
