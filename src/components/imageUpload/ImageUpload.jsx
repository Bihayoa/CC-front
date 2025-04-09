import React, { useState } from 'react';
import { setAvatar } from '../../api/uploadAPI';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [files, setFiles] = useState();

    const token = localStorage.getItem('token');

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);

            setFiles(event.target.files);
        }

        // console.log(selectedImage)
    };

    const handleSubmit = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('images', files[0]);

        try {
            const response = await setAvatar(token, formData);
            

            // console.log('Успешно загружено:', response.avatar_url);
            // Здесь вы можете обработать ответ от сервера
            localStorage.setItem('avatar_url', response.avatar_url)
            window.location.reload();
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
                <div>
                    <h4>Предварительный просмотр:</h4>
                    <img src={selectedImage} alt="Предварительный просмотр" style={{ maxWidth: '300px', maxHeight: '300px' }} /><br /><br />
                    <button onClick={handleSubmit}>Отправить</button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
