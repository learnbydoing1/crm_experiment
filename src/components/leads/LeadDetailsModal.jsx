import React from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import clsx from 'clsx';

const DocumentStatus = ({ status }) => {
  const styles = {
    verified: 'text-green-600 dark:text-green-400',
    pending: 'text-yellow-600 dark:text-yellow-400',
    rejected: 'text-red-600 dark:text-red-400',
    in_progress: 'text-blue-600 dark:text-blue-400'
  };

  return (
    <span className={clsx('font-medium', styles[status])}>
      {status.replace('_', ' ')}
    </span>
  );
};

const Timeline = ({ communications }) => (
  <div className="mt-6 flow-root">
    <ul className="-mb-8">
      {communications.map((event, eventIdx) => (
        <li key={eventIdx}>
          <div className="relative pb-8">
            {eventIdx !== communications.length - 1 ? (
              <span
                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                aria-hidden="true"
              />
            ) : null}
            <div className="relative flex space-x-3">
              <div>
                <span className={clsx(
                  'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-dark-card',
                  event.type === 'email' ? 'bg-blue-500' : 'bg-green-500'
                )}>
                  {event.type === 'email' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {event.type === 'email' ? event.subject : event.content}
                  </p>
                </div>
                <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(event.timestamp), 'MMM d, HH:mm')}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl">
          <Card>
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                    {lead.name}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lead Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Details</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">City</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Vehicle Type</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.vehicle}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{lead.experience}</dd>
                    </div>
                  </dl>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-8 mb-4">Required Documents</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Driver's License</p>
                        <DocumentStatus status={lead.documents.license.status} />
                      </div>
                      {lead.documents.license.url && (
                        <Button variant="secondary">View</Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Insurance</p>
                        <DocumentStatus status={lead.documents.insurance.status} />
                      </div>
                      {lead.documents.insurance.url && (
                        <Button variant="secondary">View</Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Background Check</p>
                        <DocumentStatus status={lead.documents.background_check.status} />
                      </div>
                      {lead.documents.background_check.url && (
                        <Button variant="secondary">View</Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Communication Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Communication History</h3>
                  <Timeline communications={lead.communications} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button>
                Send Message
              </Button>
            </div>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}