import {PrismaClient} from '@prisma/client'

const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['info', 'warn'] : ['error']
})

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalPrisma.prisma ?? client

if (process.env.NODE_ENV === 'development') {
    globalPrisma.prisma = client
}