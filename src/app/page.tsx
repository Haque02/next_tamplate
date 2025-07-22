"use client"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { get } from "http"

export default function Home() {
  const { data: objectData, isLoading } = useQuery({ queryKey: ["todos"], queryFn: getData })


  return (
    <div>
      <div>
      <p>
        { isLoading ? "Loading..." : JSON.stringify(objectData) }
      </p>
      </div>
      <AgeFilterListUl></AgeFilterListUl>
    </div>
  )
}

function AgeFilterListUl() {
    const { data: arrayData } = useQuery({ queryKey: ["todos1"], queryFn: getArray })
  return (
        <div>
        <ul>
          {arrayData?.map((item: any, index: any) => (
            <li key={item.name}>
              {item.name} - {item.age}
            </li>
          ))}
        </ul>
      </div>
  )
}


function getData() { 
  console.log("getData方法被调用了")
  return fetch('/api/demo', {
    method: 'GET'
  }).then(res => res.json())
}

function getArray() { 
  console.log("getArray方法被调用了")
  return fetch('/api/demo', {
    method: 'POST'
  }).then(res => res.json())  
}