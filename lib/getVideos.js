import videoTestData from "../data/videos.json";
import { getWatchedVideos, getMyListVideos } from "./db/hasura";
const fetchVideos = async (url) => {
  const YoutubeAPIKey = process.env.YoutubeAPIKey;

  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YoutubeAPIKey}`
  );

  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    //To not exceed the limit of free API call
    // const isDev = process.env.DEVELOPMENT;
    const data = false ? videoTestData : await fetchVideos(url);
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    return data?.items.map((item) => {
      const snippet = item.snippet;
      const id = item.id?.videoId || item.id;
      return {
        title: snippet?.title,
        // imgURL: item.snippet.thumbnails.high.url,
        imgURL: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};
export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};
export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};
export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgURL: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || []
  );
};
export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgURL: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || []
  );
};
