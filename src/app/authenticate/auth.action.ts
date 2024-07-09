"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { SignUpSchema } from "./SignUpForm"
import {Argon2id} from "oslo/password"
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { SignInSchema } from "./SignInForm"
import { redirect } from "next/navigation"
import { generateCodeVerifier, generateState } from "arctic"
import { googleOAuthClient } from "@/lib/googleOAuth"
import { url } from "inspector"
export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    
    try{
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email
            }
        })
        if (existingUser) {
            return {error: "User already exists", success: false}
        }

        const hashedPassword = await new Argon2id().hash(values.password)

        const user = await prisma.user.create({
            data: {
                email: values.email,
                name: values.name,
                role: "USER",
                hashedPassword
            }
        })
        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        return {success: true}
    }catch(error){
        return {error: "An error occurred", success: false}
    }
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
    const user = await prisma.user.findUnique({
        where: {
            email: values.email
        }
    })
    if(!user || !user.hashedPassword){
        return {error: "Invalid email or password", success: false}
    }
    const passwordMatch = await new Argon2id().verify(user.hashedPassword, values.password)
    if(!passwordMatch){
        return {error: "Invalid email or password", success: false}
    }
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return {success: true}
}

export const signOut = async () => {
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect("/authenticate")
}

export const getGoogleOAuthConsentUrl = async () => {
    try{
        const state = generateState()
        const codeVerifier = generateCodeVerifier()
        cookies().set("codeVerifier", codeVerifier, 
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
        cookies().set("state", state, 
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
        const authUrl = await googleOAuthClient.createAuthorizationURL(state, codeVerifier, {
            scopes: ["email", "profile"]
        })
        return {success: true, url: authUrl.toString()}
        
    }
    catch(error){
        return {error: "An error occurred", success: false}
    }
}