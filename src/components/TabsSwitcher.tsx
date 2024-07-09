'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type Props = {
    SignUpTab: React.ReactNode
    SignInTab: React.ReactNode
}
 const TabsSwitcher = ({SignUpTab, SignInTab}: Props ) => {
  return (
    <Tabs defaultValue='signIn' className='max-w-500'>
        <TabsList className='flex  bg-transparent'>
            <TabsTrigger value='signIn'>Sign In</TabsTrigger>
            <TabsTrigger value='signUp'>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value='signIn'>{SignInTab}</TabsContent>
        <TabsContent value='signUp'>{SignUpTab}</TabsContent>
    </Tabs>
  )
}

export default TabsSwitcher