import { AssetForm } from "../_components/asset-form";

export default function NewAssetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Asset</h1>
        <p className="text-muted-foreground">Create a new asset in your inventory</p>
      </div>
      <AssetForm />
    </div>
  );
}
