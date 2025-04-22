
'use client';

import { useState } from 'react';

export default function ArtigoPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const article = { title,description, text, date };

        try {
            const response = await fetch('/api/artigos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });

            if (response.ok) {
                alert('Article posted successfully!');
                setTitle('');
                setText('');
                setDate('');
                setDescription('');
            } else {
                alert('Failed to post article.');
            }
        } catch (error) {
            console.error('Error posting article:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div className='text-white'>
            <h1>Post an Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Texto:</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post Article</button>
            </form>
        </div>
    );
}