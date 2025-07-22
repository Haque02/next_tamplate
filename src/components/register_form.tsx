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


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <SetCardHeader />
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">密码</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">确认密码</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              
              <div className="flex flex-col gap-3">
                <LoginButton />
                <Button variant="outline" className="w-full">
                  使用谷歌账号注册
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function SetCardHeader() {
    // 0 注册 1 登录(设置全局状态)
    let flash = 0;
    return <CardHeader>
          <CardTitle>{ flash === 0 ? "请注册您的帐户" : "请登录您的帐户" }</CardTitle>
        <CardDescription>
            { flash === 0 ? "请输入您的电子邮件以注册您的帐户" : "请输入您的电子邮件以登录您的帐户" }
          </CardDescription>
        </CardHeader>
}

function LoginButton() {
    const router = useRouter();
    const handleLogin = () => {
        // 鉴权
        router.push('/login');
    };
    return <Button type="submit" className="w-full" onClick={handleLogin}>注册</Button>
}