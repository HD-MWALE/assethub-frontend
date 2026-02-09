"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiClient, type Asset } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { AssetModalForm } from "./_components/asset-modal-form";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<string | undefined>();

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setIsLoading(true);
    try {
      const result = await apiClient.getAssets();
      if (result.error) {
        toast.error(result.error);
      } else {
        setAssets(result.assets || []);
      }
    } catch (error) {
      toast.error("Failed to load assets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await apiClient.deleteAsset(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Asset deleted successfully");
        setAssets(assets.filter((a) => a.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete asset");
    } finally {
      setDeleteId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      case "RETIRED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground">Manage your organization's assets</p>
        </div>
        <Button onClick={() => { setEditingAssetId(undefined); setModalOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          New Asset
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
          <CardDescription>
            {assets.length} asset{assets.length !== 1 ? "s" : ""} in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading assets...</div>
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-muted-foreground mb-4">No assets found</div>
              <Button variant="outline" onClick={() => { setEditingAssetId(undefined); setModalOpen(true); }}>
                Create First Asset
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Purchase Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.assetCode}</TableCell>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>{asset.category?.name || "—"}</TableCell>
                      <TableCell>{asset.location?.name || "—"}</TableCell>
                      <TableCell>
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(asset.status))}>
                          {asset.status}
                        </span>
                      </TableCell>
                      <TableCell>${asset.purchasePrice?.toFixed(2) || "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setEditingAssetId(asset.id); setModalOpen(true); }} title="View/Edit">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingAssetId(asset.id); setModalOpen(true); }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(asset.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Asset</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this asset? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AssetModalForm
        open={modalOpen}
        onOpenChange={setModalOpen}
        assetId={editingAssetId}
        onSuccess={loadAssets}
      />
    </div>
  );
}
