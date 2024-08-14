import React, { useState } from "react";
import classNames from "classnames/bind";
import TextareaAutosize from 'react-textarea-autosize';

import style from "./Comment.module.scss";
import images from "../../../assets/images";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(style);


const Comment: React.FC = () => {

    return (
        <div className={cx("comment")}>
            <div className={cx("header")}>
                <h2>Comment</h2>
            </div>
            <ExpandingTextarea />
            <ul className={cx("list")}>
                <li className={cx("content")}>
                    <img className={cx("avatar")} src={images.image} />
                    <div className={cx("post")}>
                        <h5 className={cx("username")}>Levi</h5>
                        <div className={cx("timeago")}>2024/08/06 <span>Edited</span></div>
                        <p className={cx("disscusion")}>Maomao lived a peaceful life with her apothecary father. Until one day, she's sold as a lowly servant to the emperor's palace. But she wasn't meant for a compliant life among royalty. So when imperial heirs fall ill, she decides to step in and find a cure! This catches the eye of Jinshi, a handsome palace official who promotes her. Now, she's making a name for herself solving medical mysteries!</p>
                        <div className={cx("action")}>
                            <Button className={cx("icon-like")} leftIcon={<i className="bx bx-like"></i>}>Like</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-dislike"></i>}>Dislike</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-trash"></i>}>Trash</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-reply"></i>}>Reply</Button>
                        </div>
                    </div>
                </li>
                <li className={cx("content", "reply")}>
                    <img className={cx("avatar")} src={images.image} />
                    <div className={cx("post")}>
                        <h5 className={cx("username")}>Levi</h5>
                        <div className={cx("timeago")}>2024/08/06</div>
                        <p className={cx("disscusion")}>okoko</p>
                        <div className={cx("action")}>
                            <Button className={cx("icon-like")} leftIcon={<i className="bx bx-like"></i>}>Like</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-dislike"></i>}>Dislike</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-trash"></i>}>Trash</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-reply"></i>}>Reply</Button>
                        </div>
                    </div>
                </li>
                <li className={cx("content", "reply")}>
                    <img className={cx("avatar")} src={images.image} />
                    <div className={cx("post")}>
                        <h5 className={cx("username")}>Levi</h5>
                        <div className={cx("timeago")}>2024/08/06</div>
                        <p className={cx("disscusion")}>Maomao lived a peaceful life with her apothecary father.</p>
                        <div className={cx("action")}>
                            <Button className={cx("icon-like")} leftIcon={<i className="bx bx-like"></i>}>Like</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-dislike"></i>}>Dislike</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-reply"></i>}>Reply</Button>
                        </div>
                    </div>
                </li>
                <li className={cx("content")}>
                    <img className={cx("avatar")} src={images.image} />
                    <div className={cx("post")}>
                        <h5 className={cx("username")}>Levi</h5>
                        <div className={cx("timeago")}>2024/08/06</div>
                        <p className={cx("disscusion")}>haha.</p>
                        <div className={cx("action")}>
                            <Button className={cx("icon-like")} leftIcon={<i className="bx bx-like"></i>}>Like</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-dislike"></i>}>Dislike</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-reply"></i>}>Reply</Button>
                        </div>
                    </div>
                </li>
                <li className={cx("content")}>
                    <img className={cx("avatar")} src={images.image} />
                    <div className={cx("post")}>
                        <h5 className={cx("username")}>Levi</h5>
                        <div className={cx("timeago")}>2024/08/06</div>
                        <p className={cx("disscusion")}>After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.</p>
                        <div className={cx("action")}>
                            <Button className={cx("icon-like")} leftIcon={<i className="bx bx-like"></i>}>Like</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-dislike"></i>}>Dislike</Button>
                            <Button className={cx("icon")} leftIcon={<i className="bx bx-reply"></i>}>Reply</Button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

const ExpandingTextarea: React.FC = () => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className={cx("input-comment")}>
            <img className={cx("avatar")} src={images.image} alt="avatar" />
            <div className={cx('textareaContainer')}>
                <TextareaAutosize
                    value={value}
                    onChange={handleChange}
                    minRows={1}
                    className={cx('textarea')}
                />
            </div>
            <div className={cx('buttonContainer')}>
                <Button className={cx("button")} outline small >Send</Button>
            </div>
        </div>
    );
};

export default Comment