import axios from "axios";
import React from "react";

const Youtube = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [allVideos, setAllVideos] = React.useState([]);
    const [currentVideo, setCurrentVideo] = React.useState(null);

    async function handleSearch() {
        try {
            const data = await axios.get(
                "https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        q: searchTerm,
                        key: process.env.REACT_APP_YOUTUBE_API,
                        part: "snippet",
                        maxResults: 10,
                    },
                }
            );
            // console.log(data);
            setAllVideos(data.data.items);
            setCurrentVideo(data.data.items[0]);
            // console.log(data.data.items);
            // console.log(data.data.items[0]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <nav>
                <input
                    type="text"
                    placeholder="search item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </nav>
            <main>
                <div className="current-video">
                    {currentVideo && (
                        <div>
                            <iframe
                                width="420"
                                height="315"
                                title={currentVideo.snippet.title}
                                src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}></iframe>
                            <h4>{currentVideo.snippet.title}</h4>
                            <p>{currentVideo.snippet.description}</p>
                        </div>
                    )}
                </div>
                <div className="video-list">
                    {allVideos.length > 0 ? (
                        allVideos.map((video, idx) => {
                            return (
                                <div
                                    key={idx + 1}
                                    onClick={() => setCurrentVideo(video)}>
                                    <img
                                        src={
                                            video.snippet.thumbnails.default.url
                                        }
                                        alt=""
                                        height={
                                            video.snippet.thumbnails.default
                                                .height
                                        }
                                        width={
                                            video.snippet.thumbnails.default
                                                .width
                                        }
                                    />
                                    <h4>{video.snippet.title}</h4>
                                    <p>{video.snippet.channelTitle}</p>
                                </div>
                            );
                        })
                    ) : (
                        <h3>no videos available right now. please search</h3>
                    )}
                </div>
            </main>
        </React.Fragment>
    );
};

export default Youtube;
