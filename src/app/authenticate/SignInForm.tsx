"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { signIn } from './auth.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

const SignInForm = () => {
    const router = useRouter()
    const  form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
            },
    })
    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        const res = await signIn(values)
        if (res){
            if (res.success){
                toast.success("Signed in successfully")
                router.push('/dashboard')
            }
            else{
                toast.error(res.error)
            }
        }
    }
    

 
  return (
    <Card className='min-w-[500px]'>
        <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
            <Form {...form}>
                <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name='email'
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' {...field} placeholder='Enter your email' />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='password'
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} placeholder='Enter your password' />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button type='submit'>Sign In</Button>
                </form>
            </Form>
    
        </CardContent>
    </Card>
  )
}

export default SignInForm