import { getUser } from '../../lib/auth';

export default function ProfilePanel() {
  const user = getUser();

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-dark mb-1">Organization Profile</h2>
      <p className="text-sm text-dark-muted mb-6">Update your organization details and contact info.</p>

      <form className="space-y-5 max-w-lg">
        <div>
          <label className="block text-sm font-bold text-dark mb-1">Full Name</label>
          <input
            type="text"
            value={user?.fullName || ''}
            disabled
            className="w-full border-border rounded bg-gray-100 text-gray-700 text-sm p-2 border cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full border-border rounded bg-gray-100 text-gray-700 text-sm p-2 border cursor-not-allowed"
          />
          <p className="text-xs text-gray-400 mt-1">Contact support to change your email.</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1">Organization Name</label>
          <input
            type="text"
            value={user?.tenantName || ''}
            disabled
            className="w-full border-border rounded bg-gray-100 text-gray-700 text-sm p-2 border cursor-not-allowed"
          />
          <p className="text-xs text-gray-400 mt-1">Contact support to change your organization name.</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-1">Role</label>
          <input
            type="text"
            value={user?.role || ''}
            disabled
            className="w-full border-border rounded bg-gray-100 text-gray-700 text-sm p-2 border cursor-not-allowed"
          />
        </div>
      </form>
    </div>
  );
}