import { avatarDefault } from "../../config/index";

export default function Teacher({ title, position, description, website, avatar }) {
    return (
        <div className="teacher">
            <div className="avatar">
                <img src={avatarDefault} alt="" />
            </div>
            <div className="info">
                <div className="name">{title}</div>
                <div className="title">
                    {position}
                </div>
                <p className="intro" dangerouslySetInnerHTML={{ __html: description }}>
                </p>
                {
                    website && <p>
                        <strong>Website:</strong>{" "}
                        <a href={website} target="_blank">{website}</a>
                    </p>
                }
            </div>
        </div>
    )
}
