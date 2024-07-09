"use client"
import React from 'react'
import { Button } from './ui/button'
import {RiGoogleFill} from "@remixicon/react"
import { getGoogleOAuthConsentUrl } from '@/app/authenticate/auth.action'
import { toast } from 'sonner'
const GoogleOAuthButton = () => {
  return (
    <Button onClick={async ()=>{
      console.log("google sign in"); 
      const res = await getGoogleOAuthConsentUrl()
      if(res.url){
        window.location.href = res.url
      }else{
        toast("An error occurred")
      }
    }}>
      <RiGoogleFill/> Continue with Google!</Button>
  )
}

export default GoogleOAuthButton