import React, {useState} from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Oss from 'ali-oss';


export default function UploadBtn(props:any) {
  // const [aliOss] = useState<any>(new Oss({
  //   accessKeyId: 'LTAI4G7JzEFQGEptAUzK8NQU',
  //   accessKeySecret: 'qsEz91FoxsnFP0B29CO9B6icbkaVFF',
  //   region: 'oss-cn-beijing',
  //   bucket: 'mamba24',
  // }))
  // const handleUpload = async (options: { onSuccess: any; onError: any; file: any; onProgress: any; }) => {
  //   console.log(options, 123);
  //   const { onSuccess, onError, file, onProgress } = options;
  //   if (aliOss) {
  //     try {
  //       await aliOss.multipartUpload(`${file.name}`, file, {
  //         progress: (progress: number) => {
  //           onProgress({ percent: progress * 100 }); // 执行onProgress 并传入当前进度，使得上传组件正确显示进度条
  //           // changeUploadProgress(progress, checkpoint);// 这里是我用来更新state 上定义的进度，以控制显示 自己写的上传进度动画。
  //         },
  //       });
  //       onSuccess();
  //     } catch (e) {
  //       onError();
  //     }
  //   }
  // };
  const uploadProps = {
    name: 'file',
    action: 'admin/uploadOss',
    // data: (file: any) => ({
    //   'key' : file.uid,
    //   'policy': policyBase64,
    //   'OSSAccessKeyId': "LTAI4G7JzEFQGEptAUzK8NQU",
    //   'success_action_status' : '200', //让服务端返回200，否则默认返回204。
    //   // 'signature': signature,
    // }),
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        props.onAdd(info.fileList)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    // @ts-ignore
    <Upload {...uploadProps} 
    // customRequest={handleUpload}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}
