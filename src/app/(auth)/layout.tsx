
import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode
}

export const metadata = {
    title: "Create an account",
    description: "Create an account to get started.",
  }

export default function AuthLayout({ 
    children
 }: AuthLayoutProps) {

  return (
    <div className='min-h-screen flex justify-center items-center'>{children}</div>
  )
}