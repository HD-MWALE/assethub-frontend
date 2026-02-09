import { UserForm } from "../_components/user-form";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invite User</h1>
        <p className="text-muted-foreground">Add a new team member</p>
      </div>
      <UserForm />
    </div>
  );
}
