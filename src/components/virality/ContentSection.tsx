
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Video, Music, Layout } from "lucide-react"

export function ContentSection() {
  const aspects = [
    { name: "Editing & Visual Quality", score: 85, icon: Video },
    { name: "Audio & Sound Design", score: 90, icon: Music },
    { name: "Format & Platform Optimization", score: 95, icon: Layout },
  ]

  const tags = [
    "Has Subtitles",
    "Trending Audio",
    "9:16 Ratio",
    "HDR Quality",
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content – Enhancing the Concept (30%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {aspects.map((aspect) => (
            <div key={aspect.name} className="space-y-2">
              <div className="flex items-center gap-2">
                <aspect.icon className="h-4 w-4" />
                <span className="font-medium">{aspect.name}</span>
                <span className="ml-auto">{aspect.score}%</span>
              </div>
              <Progress value={aspect.score} />
            </div>
          ))}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
