import React from 'react';
import { Database, CheckCircle, HardDrive, Cloud, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Storage = () => {
    const { t } = useLanguage();
    const content = t('products.storage');

    return (
        <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
            {/* Hero */}
            <div className="bg-gray-900 text-white py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Database className="w-16 h-16 text-primary mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
                        <p className="text-xl text-gray-300 font-light">{content.subtitle}</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/storage/powerstore/powerstore-1200t/media-gallery/storage-powerstore-1200t-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full"
                                alt="Dell Storage"
                                className="w-full h-full object-contain bg-gray-100"
                            />
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {content.desc}
                            </p>

                            <div className="space-y-4">
                                {content.features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lineup */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Product Lineup</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.lineup.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                                    {index === 0 ? <Layers className="w-6 h-6 text-primary" /> :
                                        index === 1 ? <HardDrive className="w-6 h-6 text-primary" /> :
                                            <Cloud className="w-6 h-6 text-primary" />}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Storage;
