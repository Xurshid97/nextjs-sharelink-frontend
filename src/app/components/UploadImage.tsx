import React, { useState } from "react";
import { Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { uploadImageForCreateLink } from "../api/imageAPI";
import { getAccessToken } from "../constants/storage";
import { IMAGE_URL } from "../constants/urls";

type FileType = File;

const UploadImage: React.FC = () => {
    const [fileList] = useState<UploadFile[]>([]);
    const accessToken = getAccessToken(); // Replace with your actual access token

    const onChange: UploadProps["onChange"] = async ({
        file,
        // Remove the unused variable 'newFileList'
    }) => {
        console.log("File:", file);
        try {
            const response = await uploadImageForCreateLink(
                accessToken || "",
                file.originFileObj as File,
                IMAGE_URL
            );
            message.success(`${file.name} file uploaded successfully`);
            console.log("Upload response:", response);
        } catch (error) {
            message.error(`${file.name} file upload failed.`);
            console.error("Upload error:", error);
        }
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div
            style={{
                width: "100%",
                margin: "5px 0 0 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <style>
                {`
          .ant-upload {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
            </style>
            <ImgCrop rotationSlider>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false} // Prevent auto-upload
                >
                    {fileList.length < 1 && "+ Upload"}
                </Upload>
            </ImgCrop>
        </div>
    );
};

export default UploadImage;
