import { redirect } from 'next/navigation'
import { FC } from 'react'

const Home: FC = () => {
  redirect('/about')
}

export default Home