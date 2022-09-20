import type { NextPage } from 'next'
import Link from 'next/link'

import requestManager from '../lib/http/manager'

const loginWithGoogle = async () => {
  return await requestManager('GET', 'auth/sign-in');
}

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
