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
import { apiClient, type UserData } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { UserModalForm } from "./_components/user-modal-form";

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | undefined>();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const result = await apiClient.getUsers();
      if (result.error) {
        toast.error(result.error);
      } else {
        setUsers(result.users || []);
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await apiClient.deleteUser(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage team members and permissions</p>
        </div>
        <Button onClick={() => { setEditingUserId(undefined); setModalOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            {users.length} user{users.length !== 1 ? "s" : ""} in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading users...</div>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-muted-foreground mb-4">No users found</div>
              <Button variant="outline" onClick={() => { setEditingUserId(undefined); setModalOpen(true); }}>
                Create First User
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800",
                          )}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            user.isEmailVerified
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800",
                          )}
                        >
                          {user.isEmailVerified ? "Yes" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setEditingUserId(user.id); setModalOpen(true); }} title="View/Edit">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingUserId(user.id); setModalOpen(true); }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(user.id)}
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
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
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

      <UserModalForm
        open={modalOpen}
        onOpenChange={setModalOpen}
        userId={editingUserId}
        onSuccess={loadUsers}
      />
    </div>
  );
}
