import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <div>JS Framework Benchmark</div>
      <Link href='api/auth/sign-in'>
        <button className='btn'>Login</button>
      </Link>
    </>
  )
}

export default Home
