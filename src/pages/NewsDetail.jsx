import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsStore } from '../data/newsStore';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        newsStore.init();
        const data = newsStore.getById(id);
        if (data) {
            setArticle(data);
        } else {
            navigate('/news');
        }
    }, [id, navigate]);

    if (!article) return null;

    return (
        <div className="pt-20 pb-24 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/news" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('news.back')}
                </Link>

                <article>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {article.date}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        {article.title}
                    </h1>

                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap [&>p>img]:rounded-xl [&>p>img]:shadow-lg [&>p>img]:my-8 [&>p>img]:w-full [&>p>img]:max-h-[600px] [&>p>img]:object-cover"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>
            </div>
        </div>
    );
};

export default NewsDetail;
