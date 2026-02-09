import { LocationForm } from "../../_components/location-form";

interface EditLocationPageProps {
  params: {
    id: string;
  };
}

export default function EditLocationPage({ params }: EditLocationPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Location</h1>
        <p className="text-muted-foreground">Update location details</p>
      </div>
      <LocationForm locationId={params.id} />
    </div>
  );
}
