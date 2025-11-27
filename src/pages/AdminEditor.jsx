import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { newsStore } from '../data/newsStore';
import { Save, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const AdminEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        content: ''
    });
    const quillRef = useRef(null);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }

        if (id) {
            const post = newsStore.getById(id);
            console.log('Editing post:', post); // Debug log
            if (post) {
                // If editing an old post without content (only summary), use summary as content
                setFormData({
                    title: post.title || '',
                    date: post.date,
                    content: post.content || post.summary || ''
                });
            } else {
                navigate('/admin/dashboard');
            }
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content) => {
        setFormData({ ...formData, content });
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Max dimensions
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.7 quality
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
            };
        });
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const compressedImage = await compressImage(file);
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', compressedImage);
                } catch (error) {
                    console.error('Error processing image:', error);
                    alert('Failed to process image. Please try another one.');
                }
            }
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (id) {
                newsStore.update({ ...formData, id });
            } else {
                newsStore.add(formData);
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Save error:', error);
            alert(error.message || 'Failed to save post. It might be too large.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-900 mr-4">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit News Post' : 'Create New Post'}
                        </h1>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Enter post title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                            <div className="h-96 mb-12">
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    modules={modules}
                                    formats={formats}
                                    className="h-full"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Link
                                to="/admin/dashboard"
                                className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors mr-4"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-md flex items-center"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {id ? 'Update Post' : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminEditor;
