
import { Toaster } from "sonner"
import { ConceptSection } from "@/components/virality/ConceptSection"
import { ContentSection } from "@/components/virality/ContentSection"
import { ViralityMetricsSection } from "@/components/virality/ViralityMetricsSection"
import { TopContentSection } from "@/components/virality/TopContentSection"

export default function ViralityReport() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Virality Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptSection />
        <ContentSection />
        <ViralityMetricsSection />
        <TopContentSection />
      </div>
      
      <Toaster />
    </div>
  )
}
