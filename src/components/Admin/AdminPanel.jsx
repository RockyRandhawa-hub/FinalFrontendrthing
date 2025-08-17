import React, { useState, useEffect, useMemo } from 'react';
import { Users, Calendar, Search, Shield, Phone, CreditCard, Download, FileText } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 


const AdminPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [visitorsData, setVisitorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch visitors data
useEffect(() => {
  const fetchVisitorsData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/admin/getTheData");
      // Defensive: always use array
      const arr = Array.isArray(res?.data) ? res.data : [];
       console.log('API res:', res);
console.log('Data for visitorsData:', res?.data);

      setVisitorsData(arr);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching visitors:', err);
    } finally {
      setLoading(false);
    }

   
  };
  fetchVisitorsData();
}, []);

  // Use local date for "today"
  const today = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD" in local time

  const todayVisitors = useMemo(() => {
  return Array.isArray(visitorsData) ? visitorsData.filter(data => {
    const ticket = data.visitor.tickets && data.visitor.tickets[0];
    if (!ticket) return false;
    const ticketDate = new Date(ticket.date).toLocaleDateString('en-CA');
    return ticketDate === today;
  }) : [];
}, [visitorsData, today]);


  const filteredVisitors = useMemo(() => {
    const visitors = activeTab === 'today' ? todayVisitors : visitorsData;
    return visitors.filter(data =>
      data.visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.visitor.mobile.includes(searchTerm)
    );
  }, [activeTab, todayVisitors, visitorsData, searchTerm]);

  const formatSlot = (slot) => {
    return slot.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generatePDFContent = (visitors, title) => {
    let content = `${title}\n\n`;
    content += `Generated on: ${new Date().toLocaleString('en-IN')}\n`;
    content += `Total Visitors: ${visitors.length}\n\n`;
    content += '='.repeat(50) + '\n\n';

    visitors.forEach((data, index) => {
      const { visitor, razorpay_order_id, razorpay_payment_id } = data;
      const ticket = visitor.tickets && visitor.tickets[0];
      if (!ticket) return;
      content += `${index + 1}. ${visitor.name}\n`;
      content += `   Mobile: ${visitor.mobile}\n`;
      content += `   Date: ${formatDate(ticket.date)}\n`;
      content += `   Slot: ${formatSlot(ticket.slot)}\n`;
      content += `   Tickets: ${ticket.quantity}\n`;
      content += `   Payment ID: ${razorpay_payment_id}\n`;
      content += `   Order ID: ${razorpay_order_id}\n`;
      content += `   Persons:\n`;
      ticket.persons && ticket.persons.forEach((person, personIndex) => {
        content += `     ${personIndex + 1}. ${person.name} (Age: ${person.age})`;
        if (person.army) content += ' - Army Personnel';
        content += '\n';
      });
      content += `   Info: ${visitor.requestedTicketInfo}\n`;
      content += '-'.repeat(40) + '\n\n';
    });

    return content;
  };
const downloadPDF = (visitors, filename, title) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 14);
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 14, 22);
  doc.text(`Total Visitors: ${visitors.length}`, 14, 28);

  const tableData = [];

  visitors.forEach((data, index) => {
    const { visitor, razorpay_order_id, razorpay_payment_id } = data;
    const ticket = visitor.tickets && visitor.tickets[0];
    if (!ticket) return;
    tableData.push([
      index + 1,
      visitor.name,
      visitor.mobile,
      new Date(ticket.date).toLocaleDateString('en-IN'),
      ticket.slot.replace(/_/g, " "),
      ticket.quantity,
      razorpay_payment_id,
      razorpay_order_id,
      (ticket.persons || []).map((p, i) => `${i + 1}. ${p.name} (${p.age})${p.army ? ' [Army]' : ''}`).join('\n')
    ]);
  });

  doc.autoTable({
    startY: 34,
    head: [[
      'S.No.',
      'Name',
      'Mobile',
      'Date',
      'Slot',
      'Tickets',
      'Payment ID',
      'Order ID',
      'Persons'
    ]],
    body: tableData,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [41, 128, 185] },
    columnStyles: {
      8: { cellWidth: 40 }
    }
  });

  doc.save(filename);
};
const handleDownloadToday = () => {
  if (todayVisitors.length === 0) {
    alert("No visitors for today to generate report");
    return;
  }
  const todayString = new Date().toLocaleDateString('en-IN');
  downloadPDF(todayVisitors, `visitors_${today}.pdf`, `Today's Visitors Report - ${todayString}`);
};

const handleDownloadAll = () => {
  if (visitorsData.length === 0) {
    alert("No visitors data to generate report");
    return;
  }
  downloadPDF(visitorsData, 'all_visitors.pdf', 'All Visitors Report');
};
  const VisitorCard = ({ data }) => {
    const { visitor, razorpay_order_id, razorpay_payment_id } = data;
    const ticket = visitor.tickets && visitor.tickets[0];
    if (!ticket) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {visitor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{visitor.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <Phone className="w-4 h-4 mr-1" />
                  {visitor.mobile}
                </div>
              </div>
            </div>
          </div>
          {/* Ticket Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-medium">{formatDate(ticket.date)}</span>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                {formatSlot(ticket.slot)}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Tickets:</span> {ticket.quantity}
            </div>
            <div className="text-xs text-gray-500">
              {visitor.requestedTicketInfo}
            </div>
          </div>
          {/* Persons */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Persons ({ticket.persons ? ticket.persons.length : 0})
            </h4>
            <div className="space-y-2">
              {ticket.persons && ticket.persons.map(person => (
                <div key={person.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{person.name}</div>
                      <div className="text-xs text-gray-500">Age: {person.age}</div>
                    </div>
                  </div>
                  {person.army && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Army
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Payment Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="font-medium">Payment ID:</span>
              <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {razorpay_payment_id}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Order ID:</span> {razorpay_order_id}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading visitors data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Visitor Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium text-gray-900">{user?.FirstName} {user?.LastName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Visitors</p>
                <p className="text-2xl font-semibold text-gray-900">{todayVisitors.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-2xl font-semibold text-gray-900">{visitorsData.length}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('today')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'today'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Today's Entries
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Visitors
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDownloadToday}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Today's Report
              </button>
              <button
                onClick={handleDownloadAll}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FileText className="w-4 h-4 mr-2" />
                All Visitors Report
              </button>
            </div>
          </div>
        </div>
        {/* Quick Stats for Current View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredVisitors.length} {activeTab === 'today' ? "today's" : 'total'} entries</span>
            <span>Last updated: {new Date().toLocaleTimeString('en-IN')}</span>
          </div>
        </div>
        {/* Visitors Grid */}
        {filteredVisitors.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVisitors.map((data) => (
              <VisitorCard key={data.visitor.id} data={data} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visitors found</h3>
            <p className="text-gray-500">
              {activeTab === 'today' 
                ? "No visitors scheduled for today" 
                : "No visitors match your search criteria"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
