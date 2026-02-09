"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "../../_components/category-form";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

export default function EditCategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, categoriesRes] = await Promise.all([
          apiClient.get(`/asset-categories/${id}`),
          apiClient.get("/asset-categories"),
        ]);
        setCategory(categoryRes.data?.data || categoryRes.data);
        setCategories(categoriesRes.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground">Update category details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>Update the category information</CardDescription>
        </CardHeader>
        <CardContent>
          {category && <CategoryForm initialData={category} categories={categories} />}
        </CardContent>
      </Card>
    </div>
  );
}
