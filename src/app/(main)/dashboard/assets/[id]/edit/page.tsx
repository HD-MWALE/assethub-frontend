import { AssetForm } from "../../_components/asset-form";

interface EditAssetPageProps {
  params: {
    id: string;
  };
}

export default function EditAssetPage({ params }: EditAssetPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Asset</h1>
        <p className="text-muted-foreground">Update asset details</p>
      </div>
      <AssetForm assetId={params.id} />
    </div>
  );
}
