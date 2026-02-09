# Modal Forms Pattern Guide

## Overview

AssetHub uses a consistent modal-based form pattern for creating and editing records. This provides a streamlined, distraction-free user experience similar to the search bar command palette.

## Architecture

### Components

All modal forms are built using these core components:

1. **ModalFormWrapper** (`/src/components/modal-form-wrapper.tsx`)
   - Reusable wrapper component for modal forms
   - Handles dialog opening/closing state
   - Displays title and description
   - Manages the modal layout

2. **Specific Modal Forms** (e.g., `AssetModalForm`, `UserModalForm`)
   - Located in `_components` folders of each module
   - Contain form validation, API calls, and data loading
   - Use React Hook Form + Zod for validation
   - Include both create and edit functionality

## How to Use

### Basic Structure

```tsx
import { ModalFormWrapper } from "@/components/modal-form-wrapper";

export function YourModalForm({
  open,
  onOpenChange,
  entityId,
  onSuccess,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { /* ... */ },
  });

  useEffect(() => {
    if (open) {
      loadFormData();
    }
  }, [open, entityId]);

  const loadFormData = async () => {
    if (!entityId) return;
    // Load existing data if editing
  };

  const onSubmit = async (data: FormData) => {
    // Create or update entity
  };

  return (
    <ModalFormWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={entityId ? "Edit Entity" : "Create Entity"}
      description="Description here"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form fields */}
        </form>
      </Form>
    </ModalFormWrapper>
  );
}
```

### Using Modal Forms in List Pages

```tsx
export default function EntitiesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntityId, setEditingEntityId] = useState<string | undefined>();

  // Create button
  <Button onClick={() => { 
    setEditingEntityId(undefined); 
    setModalOpen(true); 
  }}>
    <Plus className="mr-2 h-4 w-4" />
    New Entity
  </Button>

  // Edit button in table
  <Button onClick={() => { 
    setEditingEntityId(entity.id); 
    setModalOpen(true); 
  }}>
    <Pencil className="h-4 w-4" />
  </Button>

  // Modal component at bottom
  <YourModalForm
    open={modalOpen}
    onOpenChange={setModalOpen}
    entityId={editingEntityId}
    onSuccess={loadEntities}
  />
}
```

## Implemented Modules

The following modules have been converted to use modal forms:

### 1. **Asset Management**
- **Files**: 
  - `/dashboard/assets/_components/asset-modal-form.tsx`
  - `/dashboard/assets/page.tsx`
- **Features**: Full CRUD for assets with categories, locations, and status

### 2. **User Management**
- **Files**:
  - `/dashboard/users/_components/user-modal-form.tsx`
  - `/dashboard/users/page.tsx`
- **Features**: Create and edit team members with roles and permissions

### 3. **Location Management**
- **Files**:
  - `/dashboard/locations/_components/location-modal-form.tsx`
  - `/dashboard/locations/page.tsx`
- **Features**: Add facilities with address and description

### 4. **Maintenance Management**
- **Files**:
  - `/dashboard/maintenance/_components/maintenance-modal-form.tsx`
  - `/dashboard/maintenance/page.tsx`
- **Features**: Schedule maintenance with type, cost, and status tracking

## Benefits

1. **Consistent UX**: All forms follow the same pattern
2. **No Page Navigation**: Users stay on the list view
3. **Reduced Friction**: Faster create/edit operations
4. **Mobile Friendly**: Works seamlessly on all devices
5. **Clean Architecture**: Reusable modal wrapper component
6. **Easy to Extend**: Simple pattern to apply to other modules

## Validation

All modal forms use Zod schemas for:
- Client-side validation (instant feedback)
- Type safety (TypeScript)
- Server-side consistency

Example Zod schema:
```tsx
const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  role: z.enum(["ADMIN", "USER"]),
});
```

## Error Handling

- **Failed Loads**: Toast notification with error message
- **Failed Submissions**: Toast notification with specific error
- **Validation**: Inline form error messages
- **Loading States**: Disabled buttons during submission

## Future Enhancements

To apply this pattern to other modules:

1. Create `[module]/_components/[module]-modal-form.tsx`
2. Define Zod validation schema
3. Implement form with `ModalFormWrapper`
4. Update list page to use modal state
5. Replace page links with modal triggers

## Tips

- Keep forms focused (max 6-8 fields)
- Group related fields using grid layouts
- Use form descriptions for context
- Always include cancel and submit buttons
- Show loading state during submission
- Call `onSuccess()` callback to refresh list
