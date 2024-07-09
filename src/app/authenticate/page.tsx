import TabsSwitcher from '@/components/TabsSwitcher'
import React from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'
import GoogleOAuthButton from '@/components/GoogleOAuthButton'


const AuthenticatePage = async () => {
  const user = await getUser()
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className='relative flex w-full h-screen bg-background'>
      <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className="mb-4 flex justify-center">
        <GoogleOAuthButton/>
        </div>
        <TabsSwitcher SignInTab={<SignInForm/>} SignUpTab={<SignUpForm/>} />
      </div>  
    </div>
  )
}

export default AuthenticatePage