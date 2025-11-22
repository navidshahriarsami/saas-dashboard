const users = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00", status: "Paid" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00", status: "Pending" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00", status: "Paid" },
    { name: "William Kim", email: "will@email.com", amount: "$99.00", status: "Failed" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00", status: "Paid" },
  ];
  
  export function RecentUsersTable() {
    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-500">Latest financial activity from your users.</p>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{user.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }