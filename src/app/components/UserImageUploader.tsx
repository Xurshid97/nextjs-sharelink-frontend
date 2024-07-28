import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { RcFile, UploadChangeParam } from "antd/es/upload/interface";

function getBase64(
    img: RcFile,
    callback: (imageUrl: string | ArrayBuffer | null) => void
) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

function UserImageUploader() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this URL from the response in the real world.
            getBase64(info.file.originFileObj as RcFile, (imageUrl) => {
                setImageUrl(imageUrl as string);
                setLoading(false);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
}

export default UserImageUploader;
