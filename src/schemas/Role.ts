import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    resource: { type: String, required: true },
    actions: { type: [String], default: [] },
  },
  { _id: false }
);

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: { type: [PermissionSchema], default: [] },
    isSystem: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
