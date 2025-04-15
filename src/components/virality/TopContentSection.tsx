
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, ArrowUpRight, Lightbulb as LightbulbIcon } from "lucide-react"

export function TopContentSection() {
  const similarities = [
    { name: "Content Concept Similarity", score: 75 },
    { name: "Execution Quality Similarity", score: 85 }
  ]

  const missing = [
    "Trending soundtrack integration",
    "Call-to-action overlays",
    "Multi-part story structure"
  ]

  const unique = [
    "Original perspective on trend",
    "High production value",
    "Strong emotional hook"
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Similar Content Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {similarities.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span>{item.score}%</span>
                </div>
                <Progress value={item.score} />
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              What's Missing?
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {missing.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Your Edge
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {unique.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <LightbulbIcon className="h-4 w-4" />
              Performance Prediction
            </h3>
            <p className="text-sm text-muted-foreground">
              Expected to perform 20% above average compared to similar viral videos in your niche
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
