import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiClock, FiShield, FiArrowRight } = FiIcons;

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="bg-primary text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Transporte Confiable en Costa Rica
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Conectamos aeropuertos con hoteles de manera segura y puntual. 
            Reserva tu transporte con anticipación y viaja sin preocupaciones.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/booking"
              className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-500 transition-colors inline-flex items-center space-x-2"
            >
              <span>Reservar Ahora</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ¿Por qué elegirnos?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiMapPin} className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Ubicaciones Precisas</h3>
              <p className="text-gray-600">
                Conocemos todos los aeropuertos y hoteles de Costa Rica. 
                Te llevamos exactamente donde necesitas estar.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiClock} className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Puntualidad Garantizada</h3>
              <p className="text-gray-600">
                Monitoreamos los horarios de vuelos en tiempo real para 
                asegurar que siempre estemos a tiempo.
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiShield} className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seguridad Total</h3>
              <p className="text-gray-600">
                Conductores certificados y vehículos inspeccionados regularmente 
                para tu tranquilidad y seguridad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ¿Listo para tu próximo viaje?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Reserva tu transporte ahora y disfruta de un viaje cómodo y seguro 
            desde el aeropuerto hasta tu destino.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/booking"
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors inline-flex items-center space-x-2"
            >
              <span>Hacer Reserva</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
