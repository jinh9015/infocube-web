import React from 'react';
import { Server, Database, HardDrive, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Products = () => {
    const { t } = useLanguage();

    const products = [
        {
            id: 'server',
            icon: <Server className="w-12 h-12 text-primary" />,
            title: t('products.server.title'),
            description: t('products.server.desc'),
            link: '/products/server'
        },
        {
            id: 'storage',
            icon: <Database className="w-12 h-12 text-primary" />,
            title: t('products.storage.title'),
            description: t('products.storage.desc'),
            link: '/products/storage'
        },
        {
            id: 'hci',
            icon: <HardDrive className="w-12 h-12 text-primary" />,
            title: t('products.hci.title'),
            description: t('products.hci.desc'),
            link: '/products/hci'
        },
        {
            id: 'backup',
            icon: <ShieldCheck className="w-12 h-12 text-primary" />,
            title: t('products.backup.title'),
            description: t('products.backup.desc'),
            link: '/products/backup'
        }
    ];

    return (
        <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
            <div className="bg-gray-900 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('products.title')}</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto px-4">
                    {t('products.subtitle')}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                        >
                            <div className="mb-6 bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center">
                                {product.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h2>
                            <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                                {product.description}
                            </p>
                            <Link
                                to={product.link}
                                className="inline-flex items-center text-primary font-bold hover:text-blue-700 transition-colors"
                            >
                                {t('news.readMore')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
