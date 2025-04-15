
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Trending, Heart, Anchor, Share2 } from "lucide-react"

export function ConceptSection() {
  const factors = [
    { name: "Trend Alignment", score: 85, icon: Trending },
    { name: "Psychological & Emotional Appeal", score: 75, icon: Heart },
    { name: "Hook & Retention Power", score: 90, icon: Anchor },
    { name: "Uniqueness & Shareability", score: 80, icon: Share2 },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Concept – The Core of Virality (70%)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {factors.map((factor) => (
            <div key={factor.name} className="space-y-2">
              <div className="flex items-center gap-2">
                <factor.icon className="h-4 w-4" />
                <span className="font-medium">{factor.name}</span>
                <span className="ml-auto">{factor.score}%</span>
              </div>
              <Progress value={factor.score} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
