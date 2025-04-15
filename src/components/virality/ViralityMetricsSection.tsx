
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gauge } from "lucide-react"

export function ViralityMetricsSection() {
  const metrics = {
    totalScore: 85,
    expectedRanges: {
      views: "10K-30K",
      likes: "2K-5K",
      shares: "500-1.5K",
      comments: "200-600"
    },
    suggestions: [
      "Add trending music to increase engagement",
      "Include more emotional hooks in first 3 seconds",
      "Optimize thumbnail with facial expressions"
    ]
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-6 w-6" />
          Virality Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">{metrics.totalScore}%</div>
          <div className="text-muted-foreground">Total Virality Score</div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Expected Performance</h3>
            <dl className="grid grid-cols-2 gap-4">
              {Object.entries(metrics.expectedRanges).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm text-muted-foreground capitalize">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="font-semibold mb-2">AI Suggestions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {metrics.suggestions.map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
