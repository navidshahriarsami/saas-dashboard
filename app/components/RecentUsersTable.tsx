const users = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00", status: "Paid" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00", status: "Pending" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00", status: "Paid" },
  { name: "William Kim", email: "will@email.com", amount: "$99.00", status: "Failed" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00", status: "Paid" },
];

export function RecentUsersTable() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="p-6 border-b border-zinc-100">
        <h3 className="font-semibold text-zinc-900">Recent Transactions</h3>
        <p className="text-sm text-zinc-500">Latest financial activity from your users.</p>
      </div>
      <div className="p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-zinc-900">{user.name}</div>
                  <div className="text-zinc-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-zinc-900">{user.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}