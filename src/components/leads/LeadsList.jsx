import React from 'react';
import { format } from 'date-fns';
import { LeadDetailsModal } from './LeadDetailsModal';
import clsx from 'clsx';

const StatusBadge = ({ status }) => {
  const styles = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    document_pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    screening: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
      styles[status]
    )}>
      {status.replace('_', ' ')}
    </span>
  );
};

export function LeadsList({ leads }) {
  const [selectedLead, setSelectedLead] = React.useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Contact</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">City</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Stage</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Submitted</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr 
                key={lead.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
              >
                <td className="py-3 px-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lead.vehicle}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">{lead.phone}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">{lead.city}</p>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white capitalize">
                    {lead.stage.replace('_', ' ')}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(lead.submittedAt), 'MMM d, yyyy')}
                  </p>
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    onClick={() => setSelectedLead(lead)}
                    className="text-primary hover:text-primary-light text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </>
  );
}