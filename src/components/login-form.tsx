"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 import { LoginRequest, LoginRequestSchema } from "@/app/api/login/type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { loginMutationOptions } from "@/app/api/login/query"
import { toast } from "sonner"

// 定义类型
const formList = z.object({
    email: z.email(),
    password: z.string().min(6),
  })


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

    const login = useMutation({
    ...loginMutationOptions,
    onSuccess: () => {
      router.push("/");
    },
      onError: (error) => {
      // 这里toast前置知识,和什么技术相关
      toast.warning("登录失败", {
        description: error.message,
        position: "top-left",
      });
    },
  });
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <SetCardHeader />
        <SetCardContent />
      </Card>
    </div>
  )
}

// 设置表单标题
function SetCardHeader() {
    // 0 注册 1 登录(设置全局状态)
    let flash = 1;
    return <CardHeader>
          <CardTitle>{ flash === 0 ? "请注册您的帐户" : "请登录您的帐户" }</CardTitle>
        <CardDescription>
            { flash === 0 ? "请输入您的电子邮件以注册您的帐户" : "请输入您的电子邮件以登录您的帐户" }
          </CardDescription>
        </CardHeader>
}

// 表单内容
function SetCardContent() {
  // 想了解这里为什么分别用LoginRequest和LoginRequestSchema
  // LoginRequest(定义表单的数据类型)
  // LoginRequestSchema(用于标点校验规则,里面定义好了email和password的规则,判断用户输入是否正确)
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
    return (
      <CardContent>
        <Form {...form}>
          {/* 这段看着挺蒙(双向绑定) form.handleSubmit(onSubmit) */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="grid gap-3">
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="grid gap-3">
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input placeholder="密码大于等于六位" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                </div>
              )}
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">登录</Button>
                <Button variant="outline" className="w-full">
                  使用谷歌账号登录
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm">
                没有账户?
                <Link href="/register" className="underline underline-offset-4">跳转注册</Link>          
            </div>
          </form>
          </Form>
        </CardContent>
    )
}

// 登录按钮
function onSubmit(values: z.infer<typeof formList>) {
    console.log("绑定的表单信息", values)
}

