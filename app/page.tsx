'use client'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return <Button onClick={() => router.push('/auth')}>Sign up</Button>
}
