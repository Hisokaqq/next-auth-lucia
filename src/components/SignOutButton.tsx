"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from '@/app/authenticate/auth.action'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({children}:Props) => {
  return (
    <Button onClick={()=>{signOut()}}>{children}</Button>
  )
}

export default SignOutButton