import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { LogOut, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { newsStore } from '../data/newsStore';

import { inquiryStore } from '../data/inquiryStore';

// StrictModeDroppable.jsx - Inline component to fix Strict Mode issues
const StrictModeDroppable = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return <Droppable {...props}>{children}</Droppable>;
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('news'); // 'news' or 'inquiries'

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }
        setNews(newsStore.getAll());
        setInquiries(inquiryStore.getAll());
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            newsStore.delete(id);
            setNews(newsStore.getAll());
        }
    };

    const handleDeleteInquiry = (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            inquiryStore.delete(id);
            setInquiries(inquiryStore.getAll());
        }
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(news);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setNews(items);
        newsStore.reorder(result.source.index, result.destination.index);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[date.getDay()];

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes} (${dayName})`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-500 hover:text-gray-700"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab('news')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'news'
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        News Management
                    </button>
                    <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'inquiries'
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Inquiry Management
                    </button>
                </div>

                {activeTab === 'news' ? (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">News Management</h2>
                            <Link
                                to="/admin/news/new"
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add New Post
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="w-10 px-6 py-3"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <StrictModeDroppable droppableId="news-list">
                                        {(provided) => (
                                            <tbody
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="bg-white divide-y divide-gray-200"
                                            >
                                                {news.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="hover:bg-gray-50"
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div
                                                                        {...provided.dragHandleProps}
                                                                        className="cursor-grab text-gray-400 hover:text-gray-600"
                                                                    >
                                                                        <GripVertical className="w-5 h-5" />
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{item.summary}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {item.date}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <div className="flex items-center justify-end space-x-4">
                                                                        <Link to={`/admin/news/edit/${item.id}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                                                                            <Edit className="w-4 h-4 mr-1" /> Edit
                                                                        </Link>
                                                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                                                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </tbody>
                                        )}
                                    </StrictModeDroppable>
                                </table>
                            </DragDropContext>
                            {news.length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                    No news posts found. Create your first post!
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Inquiry Management</h2>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {inquiries.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(item.timestamp || item.date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.company}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                                                    {item.email}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                {item.message}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleDeleteInquiry(item.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                                                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {inquiries.length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                    No inquiries found.
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
