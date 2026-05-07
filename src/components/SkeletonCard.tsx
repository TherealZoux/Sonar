import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <Card className="w-full max-w-xl justify-between border-1 border-[#e1e1e175] ">
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardFooter>

    </Card>
  )
}

