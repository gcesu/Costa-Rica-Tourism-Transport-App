import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { mockUsers } from '../data/mockData';

const { FiCalendar, FiMapPin, FiPlane, FiUsers, FiClock, FiCheckCircle, FiUser, FiTruck } = FiIcons;

const AdminDashboard = () => {
  const { user } = useAuth();
  const { bookings, assignDriver } = useBooking();
  const [activeTab, setActiveTab] = useState('bookings');

  const drivers = mockUsers.filter(u => u.role === 'driver');
  const customers = mockUsers.filter(u => u.role === 'customer');

  const handleAssignDriver = (bookingId, driverId) => {
    assignDriver(bookingId, driverId);
    toast.success('Conductor asignado exitosamente');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'assigned':
        return 'Asignado';
      case 'completed':
        return 'Completado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Panel Administrativo
          </h1>
          <p className="text-gray-600">
            Bienvenido, {user?.name}. Gestiona reservas, usuarios y conductores.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reservas
              </button>
              <button
                onClick={() => setActiveTab('drivers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'drivers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Conductores
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'customers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Clientes
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Todas las Reservas
                </h2>
                
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Reserva #{booking.id}
                          </h3>
                          <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusText(booking.status)}
                            </span>
                            <span className="text-sm text-gray-600">
                              Cliente: {booking.customerName}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            ${booking.totalAmount}
                          </p>
                          <p className="text-sm text-gray-600">USD</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Origen</p>
                            <p className="text-sm text-gray-600">{booking.pickupLocation}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Destino</p>
                            <p className="text-sm text-gray-600">{booking.dropoffLocation}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiUsers} className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Pasajeros</p>
                            <p className="text-sm text-gray-600">{booking.passengers}</p>
                          </div>
                        </div>
                      </div>

                      {booking.arrivalFlightNumber && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Vuelo de Llegada</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiPlane} className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.arrivalFlightNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiCalendar} className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.arrivalDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiClock} className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.arrivalTime}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {booking.departureFlightNumber && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Vuelo de Salida</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiPlane} className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.departureFlightNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiCalendar} className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.departureDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiClock} className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{booking.departureTime}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Creado: {format(new Date(booking.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                        </span>
                        
                        {booking.status === 'pending' && (
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">
                              Asignar Conductor:
                            </label>
                            <select
                              onChange={(e) => handleAssignDriver(booking.id, e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Seleccionar...</option>
                              {drivers.map((driver) => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {booking.assignedDriver && (
                          <div className="flex items-center space-x-2 text-green-600">
                            <SafeIcon icon={FiTruck} className="h-4 w-4" />
                            <span className="text-sm">
                              Conductor: {drivers.find(d => d.id === booking.assignedDriver)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'drivers' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Conductores
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drivers.map((driver) => (
                    <motion.div
                      key={driver.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <SafeIcon icon={FiUser} className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {driver.name}
                          </h3>
                          <p className="text-sm text-gray-600">{driver.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Teléfono:</span>
                          <span className="text-sm font-medium">{driver.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Licencia:</span>
                          <span className="text-sm font-medium">{driver.licenseNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Vehículo:</span>
                          <span className="text-sm font-medium">{driver.vehicleInfo}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Clientes
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customers.map((customer) => (
                    <motion.div
                      key={customer.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <SafeIcon icon={FiUser} className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {customer.name}
                          </h3>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Teléfono:</span>
                          <span className="text-sm font-medium">{customer.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Registrado:</span>
                          <span className="text-sm font-medium">
                            {format(new Date(customer.createdAt), 'dd/MM/yyyy', { locale: es })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;