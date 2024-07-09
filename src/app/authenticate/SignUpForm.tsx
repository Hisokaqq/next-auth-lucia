"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { signUp } from './auth.action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const SignUpSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }).refine(data=> data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
    }
  )

const SignUpForm = () => {
    const router = useRouter()
    const  form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            },
    })
    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        const res = await signUp(values)
        if (res){
            if(res.success){
                toast.success('Sign up successful')
                router.push('/dashboard')
            }else{
                toast.error(res?.error)
            }
        }
    }
    

 
  return (
    <Card className='min-w-[500px]'>
        <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Are you new here?</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
            <Form {...form}>
                <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name='name'
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} placeholder='Enter your name' />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
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
                    <FormField
                    control={form.control}
                    name='confirmPassword'
                    render = {({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} placeholder='Enter your password again' />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button type='submit'>Sign Up</Button>
                </form>
            </Form>
    
        </CardContent>
    </Card>
  )
}

export default SignUpForm