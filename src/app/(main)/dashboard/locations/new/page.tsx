import { LocationForm } from "../_components/location-form";

export default function NewLocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Location</h1>
        <p className="text-muted-foreground">Create a new facility location</p>
      </div>
      <LocationForm />
    </div>
  );
}
