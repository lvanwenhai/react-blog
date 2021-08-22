import React, { CSSProperties, useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import UserFormModal from "../../common/userFormModal";
import { createMessage } from "../../../Api/api";
import "./index.less";

const { TextArea } = Input;

interface CommentEditorProps {
  commentStyle?: CSSProperties;
  onSuccess: () => void;
  aiteInfo?: any;
}
function CommentEditor(props: CommentEditorProps) {
  const { commentStyle, aiteInfo, onSuccess } = props;
  const [commentValue, setCommentValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(
    JSON.parse(localStorage.usersInfo || "{}")
  );
  const handleSubmit = async () => {
    if (!localStorage.usersInfo) {
      setIsVisible(true);
      return;
    }
    if (!commentValue) {
      return;
    }
    setSubmitting(true);
    const replyInfo = {
      avatarImg: userInfo.avatarImg,
      userId: userInfo.id,
      nickName: userInfo.nickName,
      parent: aiteInfo?.id,
      byAiteName: aiteInfo?.nickName,
      isPass: true,
      content: commentValue,
    };
    await createMessage(replyInfo);
    await onSuccess();
    setSubmitting(false);
    setCommentValue("");
  };
  const handleCancel = (info: any) => {
    setIsVisible(false);
    info && setUserInfo(info);
  };
  return (
    <>
      <Comment
        className="comment-avatar"
        style={commentStyle}
        avatar={
          <>
            <Avatar
              shape="square"
              // @ts-ignore
              onClick={() => setIsVisible(true)}
              src={userInfo.avatarImg}
              alt="Han Solo"
            />
            <div className="nickName">{userInfo.nickName}</div>
          </>
        }
        content={
          <>
            <TextArea
              rows={3}
              onChange={(e) => setCommentValue(e.target.value)}
              value={commentValue}
            />
            <Button
              type="primary"
              loading={submitting}
              onClick={handleSubmit}
              style={{ marginTop: 15 }}
            >
              评论
            </Button>
          </>
        }
      />
      <UserFormModal isVisible={isVisible} onCancel={handleCancel} />
    </>
  );
}

export default CommentEditor;
