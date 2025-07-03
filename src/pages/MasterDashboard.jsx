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

const { FiCalendar, FiMapPin, FiPlane, FiUsers, FiClock, FiCheckCircle, FiUser, FiTruck, FiShield, FiSettings, FiBarChart3 } = FiIcons;

const MasterDashboard = () => {
  const { user } = useAuth();
  const { bookings, assignDriver } = useBooking();
  const [activeTab, setActiveTab] = useState('overview');

  const drivers = mockUsers.filter(u => u.role === 'driver');
  const customers = mockUsers.filter(u => u.role === 'customer');
  const admins = mockUsers.filter(u => u.role === 'admin');

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

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const assignedBookings = bookings.filter(b => b.status === 'assigned').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <SafeIcon icon={FiShield} className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Panel Master
              </h1>
              <p className="text-purple-200">
                Bienvenido, {user?.name} - Control total del sistema
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reservas</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <SafeIcon icon={FiCalendar} className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <SafeIcon icon={FiBarChart3} className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conductores</p>
                <p className="text-2xl font-bold text-gray-900">{drivers.length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <SafeIcon icon={FiTruck} className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <SafeIcon icon={FiUsers} className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vista General
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reservas
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Usuarios
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'system'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sistema
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Vista General del Sistema
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      Reservas Pendientes
                    </h3>
                    <p className="text-3xl font-bold text-yellow-600">{pendingBookings}</p>
                    <p className="text-sm text-yellow-700 mt-2">
                      Requieren asignación de conductor
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      Reservas Asignadas
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">{assignedBookings}</p>
                    <p className="text-sm text-blue-700 mt-2">
                      En proceso de ejecución
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Reservas Completadas
                    </h3>
                    <p className="text-3xl font-bold text-green-600">{completedBookings}</p>
                    <p className="text-sm text-green-700 mt-2">
                      Servicios finalizados
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Resumen de Usuarios por Rol
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{mockUsers.filter(u => u.role === 'master').length}</p>
                      <p className="text-sm text-gray-600">Master</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{admins.length}</p>
                      <p className="text-sm text-gray-600">Administradores</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{drivers.length}</p>
                      <p className="text-sm text-gray-600">Conductores</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{customers.length}</p>
                      <p className="text-sm text-gray-600">Clientes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Gestión de Reservas
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
                          <p className="text-2xl font-bold text-purple-600">
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
                              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
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

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Gestión de Usuarios
                </h2>
                
                <div className="space-y-8">
                  {/* Administradores */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Administradores
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {admins.map((admin) => (
                        <motion.div
                          key={admin.id}
                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <SafeIcon icon={FiShield} className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {admin.name}
                              </h4>
                              <p className="text-sm text-gray-600">{admin.email}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Teléfono:</span>
                              <span className="text-sm font-medium">{admin.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Rol:</span>
                              <span className="text-sm font-medium text-blue-600">Administrador</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Registrado:</span>
                              <span className="text-sm font-medium">
                                {format(new Date(admin.createdAt), 'dd/MM/yyyy', { locale: es })}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Conductores */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Conductores
                    </h3>
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
                            <div className="bg-yellow-100 p-3 rounded-full">
                              <SafeIcon icon={FiTruck} className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {driver.name}
                              </h4>
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

                  {/* Clientes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Clientes
                    </h3>
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
                              <h4 className="text-lg font-semibold text-gray-900">
                                {customer.name}
                              </h4>
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
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Configuración del Sistema
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <SafeIcon icon={FiSettings} className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Configuración General
                        </h3>
                        <p className="text-sm text-gray-600">
                          Ajustes generales del sistema de transporte
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Precio Base (USD)
                          </label>
                          <input
                            type="number"
                            defaultValue="75"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tiempo de Espera (minutos)
                          </label>
                          <input
                            type="number"
                            defaultValue="30"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email de Notificaciones
                          </label>
                          <input
                            type="email"
                            defaultValue="admin@transport.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono de Emergencia
                          </label>
                          <input
                            type="tel"
                            defaultValue="+506 8888-8888"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => toast.success('Configuración guardada')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Guardar Configuración
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <SafeIcon icon={FiShield} className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Zona de Peligro
                        </h3>
                        <p className="text-sm text-gray-600">
                          Acciones críticas del sistema
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-900 mb-2">
                          Limpiar Datos de Prueba
                        </h4>
                        <p className="text-sm text-red-700 mb-4">
                          Esta acción eliminará todas las reservas y usuarios de prueba. 
                          Solo se mantendrán los usuarios master.
                        </p>
                        <button
                          onClick={() => toast.error('Función no implementada en demo')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Limpiar Datos
                        </button>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-900 mb-2">
                          Exportar Datos
                        </h4>
                        <p className="text-sm text-yellow-700 mb-4">
                          Exportar todas las reservas y usuarios a un archivo CSV.
                        </p>
                        <button
                          onClick={() => toast.success('Exportación iniciada')}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Exportar CSV
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MasterDashboard;