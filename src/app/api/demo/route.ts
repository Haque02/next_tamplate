import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// 方法一:直接用Response
// export async function GET() {
//     return new Response(JSON.stringify({
//         "hello": "world"
//     }))
// }

// 方法一:直接用NextResponse,需要额外导入
export async function GET() {
    return new NextResponse(JSON.stringify({
        "hello": "world"
    }))
}

export async function POST() {
    // 这里为什么要用await
    const supabase = await createClient()
    const { data, error } = await supabase.from('student').select()

    console.log(data)

    return new NextResponse(JSON.stringify(data))
}