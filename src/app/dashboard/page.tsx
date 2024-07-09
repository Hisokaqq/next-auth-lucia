import SignOutButton from '@/components/SignOutButton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const DashboardPage = async () => {
    const user = await getUser()
    if (!user) {
        redirect("/authenticate")
    }
    
  return (
    <div className='relative flex w-full h-screen bg-background'>
    <Card className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <CardHeader>
        <Avatar>
        <AvatarImage src={user.pictureUrl!} />
        <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        </CardHeader>
        <CardContent>
            {Object.entries(user).map(([key, value])=> 
            <div key={key}>{key}: {value}</div>
            )}
        </CardContent>
        <CardFooter className='flex justify-center'>
            <SignOutButton>Sign Out</SignOutButton>
        </CardFooter>
    </Card>
    </div>
  )
}

export default DashboardPage 