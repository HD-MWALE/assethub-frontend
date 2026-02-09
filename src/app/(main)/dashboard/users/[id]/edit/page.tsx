import { UserForm } from "../../_components/user-form";

interface EditUserPageProps {
  params: {
    id: string;
  };
}

export default function EditUserPage({ params }: EditUserPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
        <p className="text-muted-foreground">Update user details and permissions</p>
      </div>
      <UserForm userId={params.id} />
    </div>
  );
}
