import React from "react";
import { Comment, Divider, List } from "antd";
import CommentEditor from "../commentEditor";
import { EnvironmentOutlined } from "@ant-design/icons";
import moment from "moment";
import "./index.less";

interface CommentProps {
  id: string;
  nickName: string;
  avatarImg: string;
  content: React.ReactNode;
  createdAt: string;
  city?: string;
  byAiteName?: string;
  comments?: CommentProps[];
}

interface CommentCardProps {
  comment: CommentProps;
  onFetchData: () => void;
}
interface CommentCardState {
  isReply: boolean;
  aiteInfo: CommentProps | null;
  usersInfo: any;
}
class MessageCard extends React.PureComponent<
  CommentCardProps,
  CommentCardState
> {
  constructor(props: CommentCardProps) {
    super(props);
    this.state = {
      isReply: false,
      aiteInfo: null,
      usersInfo: (localStorage.usersInfo &&
        JSON.parse(localStorage.usersInfo)) || { id: 9 },
    };
  }

  handleSubmit = () => {
    this.props.onFetchData();
  };
  handleReply = (comment: CommentProps) => {
    this.setState({
      isReply: !this.state.isReply,
      aiteInfo: comment,
    });
  };
  render() {
    const {
      comment,
      comment: { comments = [] },
    } = this.props;
    const { isReply, aiteInfo, usersInfo } = this.state;
    const renderExtra = (extra: any) => (
      <div className="renderExtra">
        <span>{moment(extra.createdAt).fromNow()}</span>
        <span className="comment-city">
          <EnvironmentOutlined />
          {extra.city}
        </span>
        {extra.userId !== usersInfo.id && (
          <strong
            className="comment-reply"
            onClick={() => this.handleReply(extra)}
          >
            回复
          </strong>
        )}
      </div>
    );
    return (
      <div className="messageCard">
        {comment && (
          <Comment
            style={{ padding: 0 }}
            {...{
              author: (
                <strong className="comment-author">{comment.nickName}</strong>
              ),
              avatar: comment.avatarImg,
              datetime: renderExtra(comment),
              content: comment.content,
            }}
          />
        )}
        {(isReply || (comments && comments.length > 0)) && (
          <Divider style={{ margin: 16 }} />
        )}
        {comments &&
          comments.map((item: CommentProps, index: number) => (
            <Comment
              className="comment-replyList"
              key={index}
              style={{ padding: 0 }}
              {...{
                author: item.nickName,
                avatar: item.avatarImg,
                datetime: renderExtra({ ...item, id: comment.id }),
                content: item.byAiteName
                  ? `@${item.byAiteName} ${item.content}`
                  : `${item.content}`,
              }}
            />
          ))}
        {isReply && comments && comments.length > 0 && (
          <Divider style={{ margin: 16 }} />
        )}
        {isReply && (
          <CommentEditor aiteInfo={aiteInfo} onSuccess={this.handleSubmit} />
        )}
      </div>
    );
  }
}
export default MessageCard;
