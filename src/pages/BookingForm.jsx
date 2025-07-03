import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiPhone, FiMapPin, FiPlane, FiCalendar, FiClock, FiUsers, FiCreditCard } = FiIcons;

const BookingForm = () => {
  const { user } = useAuth();
  const { createBooking } = useBooking();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: user?.phone || '',
    serviceType: 'airport-to-hotel',
    passengers: 1,
    pickupLocation: '',
    dropoffLocation: '',
    arrivalFlightNumber: '',
    arrivalDate: '',
    arrivalTime: '',
    departureFlightNumber: '',
    departureDate: '',
    departureTime: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    const basePrice = 75; // Base price for one-way
    switch (formData.serviceType) {
      case 'airport-to-hotel':
      case 'hotel-to-airport':
        return basePrice;
      case 'roundtrip':
        return basePrice * 2;
      default:
        return basePrice;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        userId: user?.id,
        totalAmount: calculateTotal(),
        paymentStatus: 'completed' // Simulate payment completion
      };

      const result = createBooking(bookingData);
      
      if (result.success) {
        toast.success('¡Reserva creada exitosamente!');
        navigate('/dashboard');
      } else {
        toast.error('Error al crear la reserva');
      }
    } catch (error) {
      toast.error('Error al procesar la reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Reservar Transporte
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Información del Cliente
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      required
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      required
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+506 8888-8888"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Pasajeros
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUsers} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="passengers"
                      name="passengers"
                      min="1"
                      max="8"
                      required
                      value={formData.passengers}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Service Type */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tipo de Servicio
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    name="serviceType"
                    value="airport-to-hotel"
                    checked={formData.serviceType === 'airport-to-hotel'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.serviceType === 'airport-to-hotel' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <SafeIcon icon={FiMapPin} className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-medium">Aeropuerto → Hotel</h3>
                      <p className="text-sm text-gray-600">Solo ida</p>
                    </div>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="serviceType"
                    value="hotel-to-airport"
                    checked={formData.serviceType === 'hotel-to-airport'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.serviceType === 'hotel-to-airport' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <SafeIcon icon={FiMapPin} className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-medium">Hotel → Aeropuerto</h3>
                      <p className="text-sm text-gray-600">Solo ida</p>
                    </div>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="serviceType"
                    value="roundtrip"
                    checked={formData.serviceType === 'roundtrip'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.serviceType === 'roundtrip' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="text-center">
                      <SafeIcon icon={FiMapPin} className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-medium">Ida y Vuelta</h3>
                      <p className="text-sm text-gray-600">Completo</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Locations */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Ubicaciones
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    Lugar de Recogida
                  </label>
                  <select
                    id="pickupLocation"
                    name="pickupLocation"
                    required
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar ubicación</option>
                    <option value="Aeropuerto Juan Santamaría">Aeropuerto Juan Santamaría</option>
                    <option value="Aeropuerto Daniel Oduber">Aeropuerto Daniel Oduber</option>
                    <option value="Hotel Presidente, San José">Hotel Presidente, San José</option>
                    <option value="Hotel Barceló, San José">Hotel Barceló, San José</option>
                    <option value="Hotel Crowne Plaza, San José">Hotel Crowne Plaza, San José</option>
                    <option value="Hotel Marriott, San José">Hotel Marriott, San José</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    Lugar de Destino
                  </label>
                  <select
                    id="dropoffLocation"
                    name="dropoffLocation"
                    required
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar ubicación</option>
                    <option value="Aeropuerto Juan Santamaría">Aeropuerto Juan Santamaría</option>
                    <option value="Aeropuerto Daniel Oduber">Aeropuerto Daniel Oduber</option>
                    <option value="Hotel Presidente, San José">Hotel Presidente, San José</option>
                    <option value="Hotel Barceló, San José">Hotel Barceló, San José</option>
                    <option value="Hotel Crowne Plaza, San José">Hotel Crowne Plaza, San José</option>
                    <option value="Hotel Marriott, San José">Hotel Marriott, San José</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Flight Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Información de Vuelos
              </h2>
              
              {(formData.serviceType === 'airport-to-hotel' || formData.serviceType === 'roundtrip') && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Vuelo de Llegada</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="arrivalFlightNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Vuelo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiPlane} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="arrivalFlightNumber"
                          name="arrivalFlightNumber"
                          required
                          value={formData.arrivalFlightNumber}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="AA-1234"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Llegada
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiCalendar} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="arrivalDate"
                          name="arrivalDate"
                          required
                          value={formData.arrivalDate}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Hora de Llegada
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiClock} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="time"
                          id="arrivalTime"
                          name="arrivalTime"
                          required
                          value={formData.arrivalTime}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(formData.serviceType === 'hotel-to-airport' || formData.serviceType === 'roundtrip') && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Vuelo de Salida</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="departureFlightNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Vuelo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiPlane} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="departureFlightNumber"
                          name="departureFlightNumber"
                          required
                          value={formData.departureFlightNumber}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="AA-5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Salida
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiCalendar} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="departureDate"
                          name="departureDate"
                          required
                          value={formData.departureDate}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Hora de Salida
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiClock} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="time"
                          id="departureTime"
                          name="departureTime"
                          required
                          value={formData.departureTime}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Información de Pago
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre en la Tarjeta
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre como aparece en la tarjeta"
                  />
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Tarjeta
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCreditCard} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    required
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cardCvv"
                    name="cardCvv"
                    required
                    value={formData.cardCvv}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Resumen de la Reserva
                </h3>
                <div className="text-2xl font-bold text-blue-600">
                  Total: ${calculateTotal()} USD
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Incluye todos los impuestos y servicios
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Procesando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingForm;