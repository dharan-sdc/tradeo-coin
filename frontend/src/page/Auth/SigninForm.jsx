import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { login } from "@/State/Auth/Action"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SigninForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      toast.error("All fields are required!", { position: "top-center" })
      return
    }

    dispatch(login({ data, navigate }))
    toast.success("Welcome Back to TradeO!", { position: "top-center", autoClose: 3000 })
  }

  return (
    <div>
      <h1 className='text-xl font-bold text-center pb-3'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

          {/* Email Field with Validation */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="border w-full border-gray-700 p-5"
                    placeholder="tradeo@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field with Validation */}
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Secure Passcode"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-5">
            Welcome Back
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default SigninForm
