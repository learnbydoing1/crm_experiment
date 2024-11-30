import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { LeadsList } from './LeadsList';
import { LeadFilters } from './LeadFilters';
import { AddLeadModal } from './AddLeadModal';

const initialLeads = [
  {
    id: 1,
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john@example.com',
    city: 'New York',
    status: 'document_pending',
    stage: 'documents',
    vehicle: 'Sedan',
    experience: '3 years',
    submittedAt: '2023-12-20T10:30:00Z',
    documents: {
      license: { status: 'verified', url: '#' },
      insurance: { status: 'pending', url: null },
      background_check: { status: 'pending', url: null }
    },
    communications: [
      {
        type: 'email',
        subject: 'Welcome to Our Platform',
        timestamp: '2023-12-20T10:35:00Z',
        status: 'sent'
      },
      {
        type: 'sms',
        content: 'Please complete your document submission',
        timestamp: '2023-12-21T09:00:00Z',
        status: 'delivered'
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    email: 'sarah@example.com',
    city: 'Los Angeles',
    status: 'screening',
    stage: 'background_check',
    vehicle: 'SUV',
    experience: '5 years',
    submittedAt: '2023-12-19T15:45:00Z',
    documents: {
      license: { status: 'verified', url: '#' },
      insurance: { status: 'verified', url: '#' },
      background_check: { status: 'in_progress', url: null }
    },
    communications: [
      {
        type: 'email',
        subject: 'Background Check Initiated',
        timestamp: '2023-12-19T16:00:00Z',
        status: 'sent'
      }
    ]
  }
];

export function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    stage: 'all',
    city: 'all'
  });

  const handleAddLead = (newLead) => {
    setLeads([...leads, { ...newLead, id: Date.now() }]);
  };

  const filteredLeads = leads.filter(lead => {
    if (filters.status !== 'all' && lead.status !== filters.status) return false;
    if (filters.stage !== 'all' && lead.stage !== filters.stage) return false;
    if (filters.city !== 'all' && lead.city !== filters.city) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.phone.includes(search)
      );
    }
    return true;
  });

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Driver Leads</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            Add New Lead
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">New Leads</h3>
            <p className="text-3xl font-bold text-primary">
              {leads.filter(l => l.stage === 'new').length}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Documents Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {leads.filter(l => l.stage === 'documents').length}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">In Screening</h3>
            <p className="text-3xl font-bold text-blue-500">
              {leads.filter(l => l.stage === 'background_check').length}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Approved</h3>
            <p className="text-3xl font-bold text-green-500">
              {leads.filter(l => l.stage === 'approved').length}
            </p>
          </Card>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <LeadFilters filters={filters} onChange={setFilters} />
            </CardHeader>
            <CardContent>
              <LeadsList leads={filteredLeads} />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddLead}
      />
    </main>
  );
}