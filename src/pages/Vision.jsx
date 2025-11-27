import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Vision = () => {
    const { t } = useLanguage();

    return (
        <div className="pt-20 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('vision.title')}</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('vision.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Eye className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.visionTitle')}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t('vision.visionDesc')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-primary p-10 rounded-2xl shadow-xl text-center transform md:-translate-y-4"
                    >
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Target className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">{t('vision.missionTitle')}</h2>
                        <p className="text-blue-100 leading-relaxed">
                            {t('vision.missionDesc')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Heart className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.valuesTitle')}</h2>
                        <ul className="text-gray-600 space-y-2">
                            <li>{t('vision.value1')}</li>
                            <li>{t('vision.value2')}</li>
                            <li>{t('vision.value3')}</li>
                            <li>{t('vision.value4')}</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Vision;
