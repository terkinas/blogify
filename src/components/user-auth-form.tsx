"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import toast from 'react-hot-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onRegisterSuccess?: () => void
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, onRegisterSuccess, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  const supabase = createClientComponentClient()
  const pathname = usePathname();

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    if(pathname == '/register') {
        await supabase.auth.signInWithOtp({
            email: data.email.toLowerCase(),
            options: {
              emailRedirectTo: `${location.origin}/auth/callback`,
              data: {
                stripeSubscriptionId: '',
                stripeCurrentPeriodEnd: '',
                stripeCustomerId: '',
                stripePriceId: '',
              },
            },
          }).then((res) => {
            toast.success('Check your email for the confirmation link')
            if(onRegisterSuccess) onRegisterSuccess()
          }).catch((err) => {
            toast.error(err.message)
          })
    } else if (pathname == '/login') {
        await supabase.auth.signInWithOtp({
            email: data.email.toLowerCase(),
            options: {
              emailRedirectTo: `${location.origin}/auth/callback`,
            },
            
            // password: data.password,
        }).then((res) => {
          toast.success('Authentication link sent to email')
        }).catch((err) => {
          toast.error(err.message)
        })

    }

    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {pathname === "/login" ? 'Sign In with Email' : 'Sign Up with Email'}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  )
}