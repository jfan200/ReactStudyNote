import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// 定义上传文件到 S3 的方法
export const uploadFileToS3 = async (selectedFile, setMessage, setUploadedImageUrl) => {

    const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
    });

    const fileName = selectedFile.name;

    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: selectedFile,
        ContentType: selectedFile.type,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const fileUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
        setMessage('文件上传成功！');
        setUploadedImageUrl(fileUrl);
    } catch (error) {
        console.error('上传出错:', error);
        setMessage('上传过程中发生错误，请稍后再试。');
    }
};
