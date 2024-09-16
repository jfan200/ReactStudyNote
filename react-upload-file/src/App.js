import React, { useState } from 'react';
import { uploadFileToS3 } from './utils/s3Upload';  // 引入上传文件的封装方法

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    // 处理文件选择
    const handleFileChange = (e) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
        setMessage(''); // 清空消息提示
        setUploadedImageUrl(''); // 清空上传图片 URL
    };

    // 调用封装的 handleUpload 方法
    const handleUpload = () => {
        uploadFileToS3(selectedFile, setMessage, setUploadedImageUrl);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>图片上传到 S3</h2>

            <input type="file" onChange={handleFileChange} />
            <br />
            <button onClick={handleUpload} style={{ marginTop: '20px' }}>
                上传图片
            </button>

            {message && (
                <div style={{ marginTop: '20px', color: message.includes('成功') ? 'green' : 'red' }}>
                    {message}
                </div>
            )}

            {uploadedImageUrl && (
                <div style={{ marginTop: '20px' }}>
                    <p>上传成功，点击下方链接查看图片：</p>
                    <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">
                        {uploadedImageUrl}
                    </a>
                    <br />
                    <img src={uploadedImageUrl} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default App;
