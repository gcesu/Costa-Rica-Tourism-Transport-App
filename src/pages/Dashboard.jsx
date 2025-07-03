import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiMapPin, FiPlane, FiUsers, FiClock, FiCheckCircle } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();
  const userBookings = getBookingsByUser(user?.id);

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
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenido, {user?.name}
          </h1>
          <p className="text-gray-600">
            Aquí puedes ver todas tus reservas de transporte.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Mis Reservas
          </h2>

          {userBookings.length === 0 ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiCalendar} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes reservas aún
              </h3>
              <p className="text-gray-600 mb-4">
                ¿Listo para tu próximo viaje? Crea tu primera reserva.
              </p>
              <a
                href="#/booking"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Hacer Reserva
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {userBookings.map((booking) => (
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
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

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Creado: {format(new Date(booking.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                    </span>
                    {booking.paymentStatus === 'completed' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <SafeIcon icon={FiCheckCircle} className="h-4 w-4" />
                        <span>Pagado</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;