export const mockUsers = [
  {
    id: 'master-1',
    name: 'Master Developer',
    email: 'master@transport.com',
    password: 'master123',
    role: 'master',
    phone: '+506 8888-8888',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'admin-1',
    name: 'Carlos Administrador',
    email: 'admin@transport.com',
    password: 'admin123',
    role: 'admin',
    phone: '+506 8888-7777',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'driver-1',
    name: 'Juan Conductor',
    email: 'juan@transport.com',
    password: 'driver123',
    role: 'driver',
    phone: '+506 8888-6666',
    licenseNumber: 'CR-123456',
    vehicleInfo: 'Toyota Hiace - Placa ABC-123',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'driver-2',
    name: 'María Conductora',
    email: 'maria@transport.com',
    password: 'driver123',
    role: 'driver',
    phone: '+506 8888-5555',
    licenseNumber: 'CR-789012',
    vehicleInfo: 'Mercedes Sprinter - Placa DEF-456',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'customer-1',
    name: 'Ana Cliente',
    email: 'ana@email.com',
    password: 'customer123',
    role: 'customer',
    phone: '+506 8888-4444',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const mockBookings = [
  {
    id: 'booking-1',
    userId: 'customer-1',
    customerName: 'Ana Cliente',
    customerEmail: 'ana@email.com',
    customerPhone: '+506 8888-4444',
    serviceType: 'roundtrip',
    passengers: 2,
    pickupLocation: 'Aeropuerto Juan Santamaría',
    dropoffLocation: 'Hotel Presidente, San José',
    arrivalFlightNumber: 'AA-1234',
    arrivalDate: '2024-02-15',
    arrivalTime: '14:30',
    departureFlightNumber: 'AA-5678',
    departureDate: '2024-02-22',
    departureTime: '16:45',
    totalAmount: 150,
    paymentStatus: 'completed',
    status: 'assigned',
    assignedDriver: 'driver-1',
    createdAt: '2024-02-10T10:00:00.000Z'
  }
];