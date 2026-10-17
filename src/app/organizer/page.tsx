import { AidStationPlanner } from "@/components/organizer/aid-station-planner";
import { CertificateStudio } from "@/components/organizer/certificate-studio";
import { StartWavePlanner } from "@/components/organizer/start-wave-planner";
import { PageHeader } from "@/components/layout/page-header";

export default function OrganizerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        path="/organizer"
        title="Director console"
        description="Aid stations, waves, and finisher certificates."
      />
      <AidStationPlanner />
      <StartWavePlanner />
      <CertificateStudio />
    </div>
  );
}
